import { FC, useEffect, useState } from 'react';
import Card from '../components/Card';
import productsService, { Product } from "../services/product.ts";

const Products: FC = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

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

    const handleDelete = (productId: number) => {
        setProducts((prevProducts) => prevProducts?.filter((product) => product.id !== productId) || []);
    };

    const toggleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const filteredProducts = showFavorites
        ? products?.filter((product) => {
            const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
            return likedProducts.includes(product.id);
        })
        : products;

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">Error: {error}</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Our Products</h1>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={toggleShowFavorites}>
                    {showFavorites ? 'Show All' : 'Show Favorites'}
                </button>
            </div>
            <div className="row">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
