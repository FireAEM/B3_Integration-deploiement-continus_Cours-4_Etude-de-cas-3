import { useEffect, useState } from "react";
import "./Table.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("http://localhost:3000/products");

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);

        } catch (err) {
            console.error("Erreur lors de la récupération des produits:", err);
            setError("Impossible de charger les produits");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p className="loading">Chargement des produits...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="table-container">
            <h2>Products</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price (€)</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
