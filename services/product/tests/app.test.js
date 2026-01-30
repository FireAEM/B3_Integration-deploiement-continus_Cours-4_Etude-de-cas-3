const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

// Path to JSON file
const dataPath = path.join(__dirname, '../src/data/products.json');

// Backup original data before tests
let originalData;

beforeAll(() => {
  if (fs.existsSync(dataPath)) {
    originalData = fs.readFileSync(dataPath, 'utf-8');
  } else {
    originalData = '[]';
  }
});

// Restore original data after tests
afterAll(() => {
  fs.writeFileSync(dataPath, originalData);
});

describe('Products API', () => {
  test('GET /products should return an array', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /products should create a new product', async () => {
    const newProduct = { name: 'Test Product', price: 99, description: 'Test' };
    const response = await request(app).post('/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
  });

  test('GET /products/:id should return the product', async () => {
    const products = JSON.parse(fs.readFileSync(dataPath));
    const id = products[products.length - 1].id;

    const response = await request(app).get(`/products/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
  });

  test('PUT /products/:id should update a product', async () => {
    const products = JSON.parse(fs.readFileSync(dataPath));
    const id = products[products.length - 1].id;

    const updated = { name: 'Updated Product', price: 123, description: 'Updated' };
    const response = await request(app).put(`/products/${id}`).send(updated);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updated.name);
  });

  test('DELETE /products/:id should remove a product', async () => {
    const products = JSON.parse(fs.readFileSync(dataPath));
    const id = products[products.length - 1].id;

    const response = await request(app).delete(`/products/${id}`);
    expect(response.status).toBe(204);

    const afterDelete = JSON.parse(fs.readFileSync(dataPath));
    const exists = afterDelete.find(p => p.id === id);
    expect(exists).toBeUndefined();
  });
});
