import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import dataObject from "./data/data.json";

import React from "react";
import HomePage from "./components/homePage/HomePage";
import DashBoard from "./components/dashBoard/DashBoard";
import CreatePage from "./components/dashBoard/CreatePage";
import EditPage from "./components/dashBoard/EditPage";

export default function App() {
    const [data, setData] = useState(dataObject);

    const sortProducts = (arr) => {
        arr.sort((a, b) => {
            return b.id - a.id;
        });
        return arr;
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage data={data} sortProducts={sortProducts} />} />
                <Route path="/dashBoard" element={<DashBoard />}>
                    <Route
                        path="products"
                        element={
                            <EditPage data={data} setData={setData} sortProducts={sortProducts} />
                        }
                    />
                    <Route
                        path="products/create"
                        element={<CreatePage data={data} setData={setData} />}
                    />
                </Route>
            </Routes>
        </>
    );
}
