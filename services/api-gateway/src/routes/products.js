import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Product Service unavailable" });
    }
});

export default router;
