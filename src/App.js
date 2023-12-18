import "./App.css";
import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import React from "react";
import HomePage from "./components/homePage/HomePage";
import DashBoard from "./components/dashBoard/DashBoard";
import CreatePage from "./components/dashBoard/CreatePage";
import EditPage from "./components/dashBoard/EditPage";
import CartOrder from "./components/cartPage/CartOrder";
import CartDetailPage from "./components/cartPage/CartDetailPage";
import OrderPage from "./components/cartPage/OrderPage";
import { AppContext } from "./components/myContext/AppContext";
import ProductDetailPage from "./components/cartDetail/CartDetailPage";

export default function App() {
    const sortProducts = (arr) => {
        arr.sort((a, b) => {
            return b.id - a.id;
        });
        return arr;
    };
    const [idProduct, setIdProduct] = useState(1);

    return (
        <>
            <AppContext.Provider value={{ idProduct, setIdProduct }}>
                <Routes>
                    <Route path="/" element={<HomePage sortProducts={sortProducts} />} />
                    <Route path="/productDetail" element={<ProductDetailPage />} />
                    <Route path="/dashboard" element={<DashBoard />}>
                        <Route path="products" element={<EditPage sortProducts={sortProducts} />} />
                        <Route path="products/create" element={<CreatePage />} />
                    </Route>
                    <Route path="/cartOrder" element={<CartOrder />}>
                        <Route path="carts" element={<CartDetailPage />} />
                        <Route path="orders" element={<OrderPage />} />
                    </Route>
                </Routes>
            </AppContext.Provider>
        </>
    );
}
