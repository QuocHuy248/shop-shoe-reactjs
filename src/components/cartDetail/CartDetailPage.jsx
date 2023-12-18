import React, { useContext, useEffect, useState } from "react";
import ProductService from "../../service/productService";
import { toast } from "react-toastify";
import ToastCustom from "../ToastCustom";
import { Link } from "react-router-dom";
import { AppContext } from "../myContext/AppContext";

export default function ProductDetailPage() {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { idProduct, setIdProduct } = useContext(AppContext);
    const getProduct = async () => {
        const newProduct = await ProductService.getProductById(idProduct);
        setProduct(newProduct);
    };

    const addProductToCart = async () => {
        const cartDetails = await ProductService.getAllCartDetail();
        let check = false;
        for (let i = 0; i < cartDetails.length; i++) {
            if (cartDetails[i].product.id == product.id) {
                console.log(cartDetails[i].quantity);
                const ProductAdded = {
                    quantity: cartDetails[i].quantity + 1,
                };
                console.log(cartDetails[i].quantity);
                await ProductService.increaseQuantityCart(ProductAdded, cartDetails[i].id);
                toast.info("Add more product to cart successfully");
                check = true;
                return;
            }
        }
        if (!check) {
            const ProductAdded = {
                product,
                quantity: quantity,
            };
            await ProductService.addNewProductToCart(ProductAdded);
            toast.success("Add to cart successfully");
            return;
        }
    };
    useEffect(() => {
        getProduct();
    }, []);
    return (
        <div>
            <div className="container d-flex  border-bottom py-2 mt-2 ">
                <div className="d-flex align-items-center w-180">
                    <a href="/" className="">
                        <i className="fas fa-cart-plus fa-lg"></i>Shoe shop
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
                                // className="dropdown-toggle"
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
                                <Link to="/dashboard/products">Dashboard</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/cartOrder/carts">Cart</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="#">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-align-start d-flex  mt-5">
                <div className="row flex-grow-1  ">
                    <div className="col-6 ">
                        <img src={product.img} alt="" width="450px" height="300px" />
                    </div>
                    <div className="col-6 border w-350">
                        <div className="product-detail-content">
                            <h5>Title</h5>
                        </div>
                        <div className="product-detail-content">
                            <p>{product.title}</p>
                        </div>
                        <div className="product-detail-content">
                            <div className="">
                                <p>{product.company}</p>
                            </div>
                            <div className="new-price">
                                <p>{product.category}</p>
                            </div>
                        </div>
                        <div className="product-detail-content">
                            <div className="">
                                <p>{product.color}</p>
                            </div>
                        </div>
                        <div className="price-card">
                            <div className="old-price">
                                <p>{product.prevPrice}</p>
                            </div>
                            <div className="new-price">
                                <p>{product.newPrice}</p>
                            </div>
                        </div>
                        <div className="product-detail-content">
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                }}
                                defaultValue={quantity}
                            />
                        </div>
                        <div className="pt-3 product-detail-content">
                            <button className="btn btn-success" onClick={() => addProductToCart()}>
                                <i className="fas fa-cart-plus "></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastCustom />
        </div>
    );
}
