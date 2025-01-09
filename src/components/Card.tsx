import { FC, useState } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/product';

interface CardProps {
    product: Product;
    onDelete: (productId: number) => void;
}

const Card: FC<CardProps> = ({ product, onDelete }) => {
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const toggleLike = () => {
        setLiked(!liked);
    };

    const handleDelete = () => {
        onDelete(product.id);
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="card h-100 shadow-sm" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <img src={product.images[0]} alt={product.title} className="card-img-top" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <p className="card-text text-primary font-weight-bold">${product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="like-icon" onClick={(e) => { e.stopPropagation(); toggleLike(); }}>
                        <FaHeart
                            className={`like-button ${liked ? 'liked' : ''}`}
                            style={{ cursor: 'pointer', color: liked ? 'red' : 'gray' }}
                        />
                    </div>
                    <div className="delete-icon" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                        <FaTrash
                            style={{ cursor: 'pointer', color: 'gray' }}
                            className="text-danger"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;