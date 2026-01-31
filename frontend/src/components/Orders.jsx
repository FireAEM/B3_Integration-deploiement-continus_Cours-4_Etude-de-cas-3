import { useEffect, useState } from "react";
import "./Table.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchOrders() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("http://localhost:3000/orders");

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            setOrders(data);

        } catch (err) {
            console.error("Erreur lors de la récupération des commandes:", err);
            setError("Impossible de charger les commandes");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p className="loading">Chargement des commandes...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="table-container">
            <h2>Orders</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Total (€)</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.productId}</td>
                            <td>{o.quantity}</td>
                            <td>{o.total.toFixed(2)}</td>
                            <td>{new Date(o.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
