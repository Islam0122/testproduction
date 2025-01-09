import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: FC = () => {
    return (
        <div className="container">
            <header>
                <div className="container">
                    <h1>Product Store</h1>
                    <nav>
                        <Link to="/products">Products</Link>
                        <Link to="/create-product">Create Product</Link>
                    </nav>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <div className="container">
                    <p>&copy; 2025 Product Store. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
