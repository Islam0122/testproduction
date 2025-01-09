import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import CreateProduct from "../pages/CreateProduct";
import { FC } from "react";
import Layout from "../components/Layout";
import '../styles/App.css';

const App: FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Products />} />
                    <Route path="products" element={<Products />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="create-product" element={<CreateProduct />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
