import app from "./app.js";

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Order Service running on port ${port}`);
});
