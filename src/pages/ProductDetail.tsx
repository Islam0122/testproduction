import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../services/product';
import productsService from '../services/product.ts';

const ProductDetail: FC = () => {
    const { id } = useParams<{ id: string }>(); // Получаем id из URL
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await productsService.fetchProducts();
                const foundProduct = result.data?.find((p) => p.id.toString() === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                setError("Failed to fetch product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container my-5">
            <h1>{product?.title}</h1>
            <img src={product?.images[0]} alt={product?.title} className="img-fluid" />
            <p>{product?.description}</p>
            <p className="text-primary font-weight-bold">${product?.price}</p>
        </div>
    );
};

export default ProductDetail;
