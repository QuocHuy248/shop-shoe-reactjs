import React from "react";
import { Link } from "react-router-dom";

export default function SideBarCartOrder() {
    return (
        <div className=" border-end side-bar w-180 ">
            <h5>Menu</h5>
            <div className="border-top me-1">
                <div>
                    <Link to="/cartOrder/carts">
                        <i className="fas fa-cart"></i> Cart
                    </Link>
                </div>
                <div>
                    <Link to="/cartOrder/orders">
                        <i className="fas fa-list"></i> Order
                    </Link>
                </div>
            </div>
        </div>
    );
}
