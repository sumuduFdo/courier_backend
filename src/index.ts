import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import AdminRoutes from "./routes/admin";
import AuthRoutes from "./routes/auth";
import ShipmentRoutes from "./routes/shipment";

import sequelize from "./helpers/database";
import HttpError from "./models/http-error";
import HttpResponse from "./models/http-response";

const app: Application = express();
const port: number = 4500;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from typescript modified");
});

app.use("/admin", AdminRoutes);
app.use("/auth", AuthRoutes);
app.use("/", ShipmentRoutes);

// page not found
app.use((req, res, next) => {
  const error = new HttpError(404, 'Page Not Found');
  throw error;
  // next(error);
})

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  
  if(res.headersSent) {
    return next(error);
  }

  const errStatus = error.status? error.status : 500;
  const errMessage = error.message && error.message !== '' ? error.message : 'An unknown error occurrred.';
  const response: HttpResponse = {error: {status: errStatus, message: errMessage}, data: null}
  res.status(error.status )
  res.json(response);
});

try {
  sequelize
    .authenticate()
    .then(() => {
      return sequelize.sync();
    })
    .then(() => {
      console.log("Database connection established successfully!");
      console.log("Starting server...");
      app.listen(port, () => {
        console.log("Running on Port: ", port);
      });
    })
    .catch((err: any) => {
      throw err;
    });
} catch (err) {
  console.error("Unable to connect to the Database: ", err);
}
