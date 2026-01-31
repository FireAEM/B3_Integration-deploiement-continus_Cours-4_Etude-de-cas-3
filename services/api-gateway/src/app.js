import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(cors());

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

export default app;
