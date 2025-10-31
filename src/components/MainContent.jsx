import Dashboard from "./Dashboard";
import Category from "./Category";
import AddCategory from "./AddCategory";
import Product from "./Product";
import AddProduct from "./AddProduct";
import PageNotFound from "./PageNotFound";
import { Route, Routes } from "react-router-dom"

function MainContent() {
    return(
        <>
        <main className="flex-1 overflow-auto p-6">
         <Routes>
            <Route index element = {<Dashboard/>}/>
            <Route path="/" element = {<Dashboard/>}/>
            <Route path="/category"  element = {<Category/>}/>
            <Route path="/add-category"  element = {<AddCategory/>}/>
            <Route path="/product"  element = {<Product/>}/>
            <Route path="/add-product"  element = {<AddProduct/>}/>
            <Route path="*"  element = {<PageNotFound/>}/>
         </Routes>
        </main>
        </>
    )
}

export default MainContent;