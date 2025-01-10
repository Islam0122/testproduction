import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { resetForm, setCategory, setDescription, setPrice, setTitle, setImage } from "../store/ProductSlice.ts";

const CreateProduct: React.FC = () => {
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.product);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            // Сохраняем изображение в Redux
            dispatch(setImage(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка размера изображения
        const image = product.image;  // предполагаем, что это изображение
        const maxSize = 20 * 1024 * 1024;  // 20 MB

        if (image && image.size > maxSize) {
            alert("File size exceeds 20 MB");
            return;
        }

        // Создаем FormData и отправляем запрос
        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("price", String(product.price));
        formData.append("description", product.description);
        formData.append("categoryId", product.category);

        if (image) {
            formData.append("images", image); // добавляем изображение в formData
        }

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Product created:', result);
                dispatch(resetForm());  // очищаем форму после успешного создания
            } else {
                console.error('Error creating product:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={product.title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    rows={3}
                    value={product.description}
                    onChange={(e) => dispatch(setDescription(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={product.price}
                    onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>
                <select
                    className="form-select"
                    id="category"
                    value={product.category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="home">Home</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Upload Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}  // обработчик изменения файла
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                style={{
                    background: "#C2EFD4",
                    color: "#224F34",
                    border: "none",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s, transform 0.3s"
                }}
            >
                Create Product
            </button>
        </form>
    );
};

export default CreateProduct;
