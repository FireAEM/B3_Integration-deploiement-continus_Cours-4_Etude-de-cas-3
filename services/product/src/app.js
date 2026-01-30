import express from "express";
import { getProducts } from "./products.js";

const app = express();

app.get("/products", (req, res) => {
    res.json(getProducts());
});

export default app;
