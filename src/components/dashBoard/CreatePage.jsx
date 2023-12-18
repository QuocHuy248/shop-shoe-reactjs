import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastCustom from "../ToastCustom";
export default function CreatePage({ data }) {
    const [maxId, setMaxId] = useState(0);
    const [product, setProduct] = useState({ star: 4, reviews: 123 });
    const [products, setProducts] = useState([]);

    const findMaxId = () => {
        let maxIdProduct = 0;
        products.map((item) => {
            if (item.id > maxIdProduct) {
                maxIdProduct = item.id;
            }
        });
        setMaxId(maxIdProduct);
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
    const handleCreateProduct = (obj) => {
        setProduct({
            ...product,
            id: maxId + 1,
        });
        const newProducts = data.products;

        products.push(product);

        toast.success("Create Product Successfully");
        findMaxId();
    };

    useEffect(() => {
        findMaxId();
    }, []);
    useEffect(() => {
        console.log(maxId);
        setProduct({
            ...product,
            id: maxId + 1,
        });
    }, [maxId]);
    return (
        <div className="flex-grow-1 px-2">
            <form action="">
                <div className="row">
                    <div className="col-lg-6 ">
                        <label className="font-edit">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            defaultValue={product.title}
                            onChange={handleChangeProduct}
                        />
                    </div>
                    <div className="col-lg-6">
                        <label className="font-edit">Company</label>
                        <select
                            name="company"
                            id=""
                            className="form-control select-form"
                            onChange={handleChangeProduct}
                            defaultValue={product.company}
                        >
                            {data.companies.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-lg-6 ">
                        <label className="font-edit">Category</label>
                        <select
                            name="category"
                            id=""
                            className="form-control select-form"
                            onChange={handleChangeProduct}
                            value={product.category}
                        >
                            {data.categories.map((item) => {
                                return (
                                    <option value={item.name} key={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <label className="font-edit">Color</label>
                        <select
                            name="color"
                            id=""
                            className="form-control select-form"
                            onChange={handleChangeProduct}
                            value={product.color}
                        >
                            {data.colors.map((item, index) => {
                                return (
                                    <option value={item.name} key={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-lg-6 ">
                        <label className="font-edit">Prev Price</label>
                        <input
                            type="text"
                            className="form-control"
                            name="prevPrice"
                            value={product.prevPrice}
                            onChange={handleChangeProduct}
                        />
                    </div>
                    <div className="col-lg-6 ">
                        <label className="font-edit">New Price</label>
                        <input
                            type="text"
                            className="form-control"
                            name="newPrice"
                            value={product.newPrice}
                            onChange={handleChangeProduct}
                        />
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-lg-6 ">
                        <label className="font-edit">Img</label>
                        <input
                            type="text"
                            className="form-control"
                            name="img"
                            value={product.img}
                            onChange={handleChangeProduct}
                        />
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-lg-6 ">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => {
                                handleCreateProduct(product);
                            }}
                        >
                            Create Product
                        </button>
                    </div>
                </div>
            </form>
            <ToastCustom />
        </div>
    );
}
