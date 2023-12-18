import React, { useEffect, useState } from "react";
import ModalUpdateProduct from "./ModalUpdateProduct";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ToastCustom from "../ToastCustom";
import ProductService from "../../service/productService";

export default function EditPage({ sortProducts }) {
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };
    const handleDeleteProduct = async () => {
        const deleteProduct = await ProductService.delete(product.id);
        const newProducts = products.filter((item) => item.id !== product.id);
        console.log(newProducts);
        setProducts(newProducts);
        toast.success("Delete Product Successfully");
    };
    const handleUpdateProducts = async (obj) => {
        const index = products.findIndex((item) => item.id === obj.id);
        const updatedProduct = await ProductService.edit(obj, obj.id);
        console.log(updatedProduct);
        const newProducts = [...products];
        newProducts[index] = updatedProduct;
        setProducts(newProducts);
        toast.success("Update Product Successfully");
    };

    const handleChangeProduct = (e) => {
        if (e.target.name == "company" || e.target.name == "color" || e.target.name == "category") {
            setProduct({
                ...product,
                [e.target.name]: e.target.selectedOptions[0].value,
            });
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleShowModalDelete = async (id) => {
        const productFinded = await ProductService.getProductById(id);
        setShowModalDelete(true);
        setProduct(productFinded);
    };

    const handleShowModal = async (id) => {
        const productFinded = await ProductService.getProductById(id);
        setShow(true);
        setProduct(productFinded);
    };

    const handleCloseModal = () => {
        setShow(false);
    };
    const getAllProducts = async () => {
        const productsData = await ProductService.getAllProducts();
        setProducts(productsData);
    };
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="flex-grow-1">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Img</th>
                        <th scope="col">Title</th>
                        <th scope="col">Prev Price</th>
                        <th scope="col">New Price</th>
                        <th scope="col">Company</th>
                        <th scope="col">Color</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length &&
                        sortProducts(products).map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>
                                        <img src={item.img} alt="" className="avatar-w20-h10" />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.prevPrice}</td>
                                    <td>{item.newPrice}</td>
                                    <td>{item.company}</td>
                                    <td>{item.color}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-success me-1 "
                                            onClick={() => handleShowModal(item.id)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleShowModalDelete(item.id)}
                                        >
                                            <i className="fas fa-ban"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ModalUpdateProduct
                show={show}
                handleChangeProduct={handleChangeProduct}
                handleCloseModal={handleCloseModal}
                handleUpdateProducts={handleUpdateProducts}
                product={product}
            />
            <ModalDeleteProduct
                handleCloseModalDelete={handleCloseModalDelete}
                handleDeleteProduct={handleDeleteProduct}
                showModalDelete={showModalDelete}
            />
            <ToastCustom />
        </div>
    );
}
