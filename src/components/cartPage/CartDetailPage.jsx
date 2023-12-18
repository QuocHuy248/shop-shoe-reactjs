import React, { useEffect, useState } from "react";
import ProductService from "../../service/productService";
import { toast } from "react-toastify";
import ToastCustom from "../ToastCustom";

export default function CartDetailPage() {
    const [cartDetails, setCartDetails] = useState([]);
    const getAllCartDetails = async () => {
        const cartDetailData = await ProductService.getAllCartDetail();
        setCartDetails(cartDetailData);
    };
    const increaseCartDetail = async (id) => {
        const cartDetail = await ProductService.findCartDetailById(id);
        const index = cartDetails.findIndex((item) => item.id == id);
        const newCartDetail = {
            quantity: cartDetail.quantity + 1,
        };
        ProductService.increaseQuantityCart(newCartDetail, id);
        const cartDetailData = await ProductService.getAllCartDetail();
        setCartDetails(cartDetailData);
    };
    const decreaseCartDetail = async (id) => {
        const cartDetail = await ProductService.findCartDetailById(id);
        if (cartDetail.quantity == 1) {
            toast.error("Cannot decrease quantity more");
            return;
        } else {
            const index = cartDetails.findIndex((item) => item.id == id);
            const newCartDetail = {
                quantity: cartDetail.quantity - 1,
            };
            const updatedCart = await ProductService.increaseQuantityCart(newCartDetail, id);
            toast.success("Decrease quantity successfully");
            const cartDetailData = await ProductService.getAllCartDetail();
            setCartDetails(cartDetailData);
        }
    };
    const deleteCartDetail = async (id) => {
        await ProductService.deleteProductCart(id);
        const newCartDetailList = cartDetails.filter((item) => item.id !== id);
        setCartDetails(newCartDetailList);
        toast.success("Delete Successfully");
    };
    useEffect(() => {
        getAllCartDetails();
    }, []);

    return (
        <div className="flex-grow-1">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Img</th>
                        <th scope="col">Title</th>
                        <th scope="col"> Price</th>
                        <th scope="col">Company</th>
                        <th scope="col">Color</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartDetails.length &&
                        cartDetails.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>
                                        <img
                                            src={item.product.img}
                                            alt=""
                                            className="avatar-w20-h10"
                                        />
                                    </td>
                                    <td>{item.product.title}</td>
                                    <td>{item.product.newPrice}</td>
                                    <td>{item.product.company}</td>
                                    <td>{item.product.color}</td>
                                    <td>{item.product.category}</td>
                                    <td>
                                        <div className="cart-quantity">
                                            <span onClick={() => decreaseCartDetail(item.id)}>
                                                -
                                            </span>
                                            <span>{item.quantity}</span>
                                            <span onClick={() => increaseCartDetail(item.id)}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => deleteCartDetail(item.id)}
                                        >
                                            <i className="fas fa-ban"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ToastCustom />
        </div>
    );
}
