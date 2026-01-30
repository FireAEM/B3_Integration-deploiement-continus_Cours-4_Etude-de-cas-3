import { getProducts } from "../src/products.js";

describe("getProducts", () => {
    it("should return the JSON list", () => {
        const products = getProducts();

        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toHaveProperty("id");
    });
});
