import { FC, useEffect, useState } from 'react';
import Card from '../components/Card';
import productsService, { Product } from "../services/product.ts";
import {API_HEADERS, BASE_API_URL} from "../config/api.ts";

const Products: FC = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await productsService.fetchProducts();
                if (result.error) {
                    setError(result.error);
                } else {
                    setProducts(result.data);
                }
            } catch (err) {
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (productId: number) => {
        try {
            const response = await fetch(`${BASE_API_URL}/products/${productId}`, {
                method: 'DELETE',
                headers: API_HEADERS,
            });

            if (!response.ok) {
                throw new Error(`Failed to delete product with id ${productId}`);
            }

            setProducts((prevProducts) => prevProducts?.filter((product) => product.id !== productId) || []);
        } catch (error) {
            console.error("Error deleting product:", error);
            setError("Failed to delete product");
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">Error: {error}</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Our Products</h1>
            <div className="row">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <Card product={product} onDelete={handleDelete} />
                        </div>
                    ))
                ) : (
                    <div className="text-center">No products available.</div>
                )}
            </div>
        </div>
    );
};

export default Products;
