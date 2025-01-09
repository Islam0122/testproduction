import { BASE_API_URL, API_HEADERS } from "../config/api";


export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
    liked: boolean; // Добавляем поле для избранного

}


interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

class ProductService {
    async fetchProducts(): Promise<ApiResponse<Product[]>> {
        try {
            const response = await fetch(`${BASE_API_URL}/products`, {
                method: 'GET',
                headers: API_HEADERS,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Product[] = await response.json();
            return { data, error: null };
        } catch (error) {
            console.error("Failed to fetch products:", (error as Error).message);
            return { data: null, error: "Failed to fetch products" };
        }
    }
}

const productsService = new ProductService();
export default productsService;
