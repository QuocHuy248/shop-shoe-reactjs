import React, { useEffect, useState } from "react";
import ModalUpdateProduct from "./ModalUpdateProduct";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ToastCustom from "../ToastCustom";

export default function EditPage({ data, setData, sortProducts }) {
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState(data.products);
    const [show, setShow] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const findProductById = (id) => {
        return products.find((item) => item.id === id);
    };
    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };
    const handleDeleteProduct = () => {
        const newProducts = products.filter((item) => item.id !== product.id);
        console.log(newProducts);
        setProducts(newProducts);
        setData({
            ...data,
            products: newProducts,
        });
        toast.success("Delete Product Successfully");
    };
    const handleUpdateProducts = (obj) => {
        const index = products.findIndex((item) => item.id === obj.id);

        const newProducts = [...products];

        newProducts[index] = obj;
        setProducts(newProducts);

        setData({
            ...data,
            products: newProducts,
        });
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
    const handleShowModalDelete = (id) => {
        const product = findProductById(id);
        if (Object.keys(product).length) {
            setShowModalDelete(true);
            setProduct(findProductById(id));
        } else {
            toast.error("Not found product with id" + id);
        }
    };

    const handleShowModal = (id) => {
        const product = findProductById(id);
        if (Object.keys(product).length) {
            setShow(true);
            setProduct(findProductById(id));
        } else {
            toast.error("Not found product with id" + id);
        }
    };

    const handleCloseModal = () => {
        setShow(false);
    };

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
                    {sortProducts(data.products).map((item) => {
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
                data={data}
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
