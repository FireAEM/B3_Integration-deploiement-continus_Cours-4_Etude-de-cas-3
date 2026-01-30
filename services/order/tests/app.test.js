import { getOrders } from "../src/orders.js";

describe("getOrders", () => {
    it("should return the JSON list", () => {
        const orders = getOrders();

        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThan(0);
        expect(orders[0]).toHaveProperty("id");
    });
});
