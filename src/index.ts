import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import DBPool from "./helpers/database";
import AdminRoutes from './routes/admin';
import AuthRoutes from './routes/auth'
import ShipmentRoutes from './routes/shipment'

const app: Application = express();
const port: number = 4500;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoutes);
app.use('/auth', AuthRoutes);
app.use('/', ShipmentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from typescript modified");
});

DBPool.connect()
  .then(() => {
    console.log("database connection success..");
    app.listen(port, () => {
      console.log('Running on port: ', port);
    })
  })
  .catch((err) => {
    console.log("database error");
    console.error(err);
  });
// app.listen(port, () => {
//     console.log('Running on port ', port);
// })
