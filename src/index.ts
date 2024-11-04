import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import AdminRoutes from "./routes/admin";
import AuthRoutes from "./routes/auth";
import ShipmentRoutes from "./routes/shipment";

import sequelize from "./helpers/database";

const app: Application = express();
const port: number = 4500;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoutes);
app.use("/auth", AuthRoutes);
app.use("/", ShipmentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from typescript modified");
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
// app.listen(port, () => {
//     console.log('Running on port ', port);
// })
