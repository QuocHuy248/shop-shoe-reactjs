import React from "react";
import HeaderLayout from "../dashBoard/HeaderLayout";
import SideBarCartOrder from "./SideBarCartOrder";
import { Outlet } from "react-router-dom";
import ToastCustom from "../ToastCustom";

export default function CartOrder() {
    return (
        <div>
            <HeaderLayout />
            <div className="container text-align-start d-flex ">
                <SideBarCartOrder />
                <Outlet />
            </div>
        </div>
    );
}
