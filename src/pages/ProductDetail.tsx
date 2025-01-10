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
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product?.images[0]}
                        alt={product?.title}
                        className="img-fluid rounded shadow-lg"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="display-4 font-weight-bold">{product?.title}</h1>
                    <p className="text-muted">{product?.category.name}</p>
                    <p className="lead">{product?.description}</p>
                    <p className="text-primary font-weight-bold fs-3">${product?.price}</p>
                    <div className="d-flex gap-3">
                        {product?.images.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`product-image-${index}`}
                                className="img-thumbnail"
                                style={{ width: '100px', cursor: 'pointer' }}
                                onClick={() => window.open(image, '_blank')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
