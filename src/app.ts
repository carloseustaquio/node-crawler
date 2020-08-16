require("dotenv").config();

import express from "express"
import bodyParser from "body-parser"
import router from "./routes"

// create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());

// apply routes
app.use(router);

export default app