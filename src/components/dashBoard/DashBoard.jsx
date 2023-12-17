import React from "react";
import HeaderLayout from "./HeaderLayout";
import SideBarLayout from "./SideBarLayout";
import { Outlet } from "react-router-dom";

export default function DashBoard() {
    return (
        <div>
            <HeaderLayout />
            <div className="container text-align-start d-flex ">
                <SideBarLayout />
                <Outlet />
            </div>
        </div>
    );
}
