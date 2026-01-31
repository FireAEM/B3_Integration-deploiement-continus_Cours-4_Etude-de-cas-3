import express from "express";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

export default app;
