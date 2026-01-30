import orders from "./data/orders.json" with { type: "json" };

export function getOrders() {
    return orders;
}
