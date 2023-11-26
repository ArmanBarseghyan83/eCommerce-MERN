import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connentDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connentDB(); // Connecting to DB

const port = process.env.PORT || 5000;

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware, this will allow to access req.cookies.jwt
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is rinning...");
});

// means after this path use routes in productRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// if there is no route match it goes to the next middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
