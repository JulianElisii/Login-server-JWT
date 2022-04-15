import express from "express"
import authRoutes from "./routes/auth"
import morgan from "morgan";

const app = express();

//setting 
app.set("port", 4000)


//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes 
app.use(authRoutes)

export default app;