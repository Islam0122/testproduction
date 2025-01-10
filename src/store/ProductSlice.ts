import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    title: string;
    description: string;
    price: number;
    category: string;
    image: File | null;  // Добавляем поле для изображения
}

const initialState: ProductState = {
    title: '',
    description: '',
    price: 0,
    category: '',
    image: null,  // Изначально изображение отсутствует
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setImage: (state, action: PayloadAction<File | null>) => {
            state.image = action.payload;  // Добавляем редьюсер для обновления изображения
        },
        resetForm: () => initialState,
    },
});

export const { setTitle, setDescription, setPrice, setCategory, setImage, resetForm } = productSlice.actions;

export default productSlice.reducer;
