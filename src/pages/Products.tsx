import { FC, useEffect, useState } from 'react';
import Card from '../components/Card';
import productsService, { Product } from "../services/product.ts";
import { API_HEADERS, BASE_API_URL } from "../config/api.ts";

const Products: FC = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null); // Для фильтрации
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<'all' | 'favorites'>('all'); // Для фильтрации по всем или избранным

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await productsService.fetchProducts();
                if (result.error) {
                    setError(result.error);
                } else {
                    setProducts(result.data);
                    setFilteredProducts(result.data); // Изначально показываем все продукты
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

    // Функция для фильтрации продуктов
    const handleFilterChange = (filter: 'all' | 'favorites') => {
        setFilter(filter);
        if (filter === 'all') {
            setFilteredProducts(products); // Показываем все продукты
        } else {
            setFilteredProducts(products?.filter((product) => product.liked) || []); // Показываем только избранные
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
            {/* Кнопки фильтра */}
            <div className="text-center mb-4">
                <button
                    className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                    onClick={() => handleFilterChange('all')}
                >
                    All Products
                </button>
                <button
                    className={`btn ${filter === 'favorites' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                    onClick={() => handleFilterChange('favorites')}
                >
                    Favorites
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
