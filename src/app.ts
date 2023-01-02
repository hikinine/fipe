import cors from "cors";
import express from "express";
import { route } from "./routes";
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb' }))

app.use(cors());

app.get("/", (request, response) => {
  response.status(200).send("fipe-test")
})

app.use("/v1", route);
app.listen(3000, () => console.log("Server is running"));
