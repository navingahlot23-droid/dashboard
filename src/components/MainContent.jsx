import Dashboard from "./Dashboard";
import Login from "./Login";
import Category from "./Category";
import AddCategory from "./AddCategory";
import Product from "./Product";
import AddProduct from "./AddProduct";
import PageNotFound from "./PageNotFound";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function MainContent() {
    return (
        <>
            <main className="flex-1 overflow-auto p-6">
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<PrivateRoute />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/add-category" element={<AddCategory />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/add-product" element={<AddProduct />} />
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </>
    )
}

export default MainContent;