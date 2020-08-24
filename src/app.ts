import { config as dotEnvConfig } from "dotenv"
import express, { Request, Response, NextFunction } from 'express'
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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

export default app