import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLayout() {
    return (
        <div className="container d-flex  border-bottom py-2 mt-2">
            <div className="d-flex align-items-center w-180">
                <a href="#" className="">
                    <i className="fas fa-cart-plus fa-lg"></i> Dash Board
                </a>
            </div>
            <div className="d-flex flex-grow-1 justify-content-end">
                <div className="d-flex align-items-center">
                    <a href="">
                        <i className="fas fa-shopping-cart fa-lg"></i>
                    </a>
                    <div className="dropdown">
                        <a
                            role="button"
                            className="dropdown-toggle"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fas fa-user fa-lg"></i>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <Link to="#">Profile</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/">Home Page</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/dashBoard/products">Dashboard</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/cartOrder/carts">Cart</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="#">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
