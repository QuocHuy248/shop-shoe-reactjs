import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import dataObject from "./data/data.json";

import React from "react";
import HomePage from "./components/homePage/HomePage";
import DashBoard from "./components/dashBoard/DashBoard";
import CreatePage from "./components/dashBoard/CreatePage";
import EditPage from "./components/dashBoard/EditPage";
import CartOrder from "./components/cartPage/CartOrder";
import CartDetailPage from "./components/cartPage/CartDetailPage";
import OrderPage from "./components/cartPage/OrderPage";

export default function App() {
    const sortProducts = (arr) => {
        arr.sort((a, b) => {
            return b.id - a.id;
        });
        return arr;
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage sortProducts={sortProducts} />} />
                <Route path="/dashBoard" element={<DashBoard />}>
                    <Route path="products" element={<EditPage sortProducts={sortProducts} />} />
                    <Route path="products/create" element={<CreatePage />} />
                </Route>
                <Route path="/cartOrder" element={<CartOrder />}>
                    <Route path="carts" element={<CartDetailPage />} />
                    <Route path="orders" element={<OrderPage />} />
                </Route>
            </Routes>
        </>
    );
}
