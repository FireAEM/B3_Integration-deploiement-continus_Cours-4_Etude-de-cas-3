const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Path to JSON file
const dataPath = path.join(__dirname, 'src/data/products.json');

// Helper to read products
const getProducts = () => {
  if (!fs.existsSync(dataPath)) return [];
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Helper to save products
const saveProducts = (products) => {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

// ------------------- Routes ------------------- //

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// GET all products
app.get('/products', (req, res) => {
  const products = getProducts();
  res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create product
app.post('/products', (req, res) => {
  const products = getProducts();
  const { name, price, description } = req.body;
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    description
  };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const { name, price, description } = req.body;
  products[index] = { id: products[index].id, name, price, description };
  saveProducts(products);
  res.json(products[index]);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products.splice(index, 1);
  saveProducts(products);
  res.status(204).send();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
