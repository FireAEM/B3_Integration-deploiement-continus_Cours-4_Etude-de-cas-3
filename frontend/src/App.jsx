import Products from "./components/Products";
import Orders from "./components/Orders";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
        FastShop Dashboard
      </h1>

      <Products />
      <Orders />
    </div>
  );
}

export default App;
