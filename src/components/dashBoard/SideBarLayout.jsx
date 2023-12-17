import React from "react";
import { Link } from "react-router-dom";

export default function SideBarLayout() {
    return (
        <div className=" border-end side-bar w-180 ">
            <h5>Menu</h5>
            <div className="border-top me-1">
                <div>
                    <Link to="/dashBoard/products">
                        <i className="fas fa-list"></i> Products
                    </Link>
                </div>
                <div>
                    <Link to="/dashBoard/products/create">
                        <i className="fas fa-plus-square"></i> Create Product
                    </Link>
                </div>
            </div>
        </div>
    );
}
