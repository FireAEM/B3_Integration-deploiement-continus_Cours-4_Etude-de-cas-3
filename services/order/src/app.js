import express from "express";
import { getOrders } from "./orders.js";

const app = express();

app.get("/orders", (req, res) => {
    res.json(getOrders());
});

export default app;
