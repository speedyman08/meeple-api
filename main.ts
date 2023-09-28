// @ts-ignore
import express from "express";
import { jsonErrorMiddleware } from "./middleware/badJson";
import { connectDB } from "./config/db";
import {userRoutes} from "./routes/user";
import {transactionRoutes} from "./routes/transaction";
import { createLog } from "./middleware/log";
import { applicationRoutes } from "./routes/application";
const app = express();
connectDB();

app.use(express.json());
app.use(jsonErrorMiddleware)
app.use(createLog)
app.use(userRoutes)
app.use(transactionRoutes)
app.use(applicationRoutes)
app.listen(3001, ()=>{
    console.log("Listening on 3001")
})