import { config as dotEnvConfig } from "dotenv"
import express from "express"
import router from "./routes"

// configure envaironment variables
dotEnvConfig()

// create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());

// apply routes
app.use(router);

export default app