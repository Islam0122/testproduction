import  { FC } from 'react';
import {useDispatch} from "react-redux";
import {Product} from "../services/product.ts";
import ProductForm from "../components/ProductForm.tsx";
import {addProduct} from "../store/store.ts";


const CreateProduct: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (product: Product) => {
        dispatch(addProduct(product)); // Сохраняем продукт в store
        history.push('/'); // После добавления продукта, редиректим на главную страницу
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Create Product</h1>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateProduct;
