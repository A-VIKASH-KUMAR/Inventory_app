import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
import { pgClient } from "./db";
import authRoute from "./routes/auth.route";
const app = express();
const port = 3001;
app.use(bodyParser.json());

app.use(express.json());

pgClient().then(() => {
  app.listen(port, () => {
    console.log("postgres db connected successfully");
    
    console.log("server is running on port http://localhost:" + port);
  });
});

app.use("/api/auth", authRoute);
