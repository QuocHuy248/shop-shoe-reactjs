import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastCustom from "../ToastCustom";
import ProductService from "../../service/productService";

export default function CreatePage() {
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const CLOUD_NAME = "dzw2dttfc";
    const UPLOAD_PRESET = "nllxofqr";
    const [url, setUrl] = useState(
        "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
    );

    const getAll = async () => {
        const categoriesData = await ProductService.getAllCategories();
        const companiesData = await ProductService.getAllCompanies();
        const colorsData = await ProductService.getAllColors();
        setCompanies(companiesData);
        setCategories(categoriesData);
        setColors(colorsData);
    };

    useEffect(() => {
        getAll();
    }, []);

    const [product, setProduct] = useState({ star: 4, reviews: 123 });
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

    const handleCreateProduct = async () => {
        const newProduct = {
            ...product,
            img: url,
        };
        await ProductService.create(newProduct);
        toast.success("Create Product Successfully");
        setProduct({ star: 4, reviews: 123 });
        document.getElementById("create-course-form").reset();
        setUrl(
            "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
        );
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUD_NAME);
        data.append("folder", "Cloudinary-React");
        setIsLoading(true);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: data,
        });
        if (response.ok) {
            const res = await response.json();
            console.log(res.secure_url);
            setUrl(res.secure_url);
            setIsLoading(false);
            toast.success("Load Image Successfully");
        }
    };
    return (
        <div className="flex-grow-1 px-2">
            {isLoading && <span class="loader"></span>}
            <form action="" id="create-course-form">
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
                            {companies.map((item, index) => {
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
                            {categories.map((item) => {
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
                            {colors.map((item, index) => {
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
                            type="number"
                            className="form-control"
                            name="prevPrice"
                            value={product.prevPrice}
                            onChange={handleChangeProduct}
                            min="1"
                            max="800"
                        />
                    </div>
                    <div className="col-lg-6 ">
                        <label className="font-edit">New Price</label>
                        <input
                            type="number"
                            className="form-control"
                            name="newPrice"
                            value={product.newPrice}
                            onChange={handleChangeProduct}
                            min="1"
                            max="800"
                        />
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-lg-3 ">
                        <label className="font-edit" htmlFor="fileInput">
                            Img
                            <img
                                src={url}
                                alt=""
                                width="200px"
                                height="120px"
                                className="row ps-3"
                            />
                        </label>
                        <input
                            hidden
                            type="file"
                            className="form-control ps-1"
                            id="fileInput"
                            name="img"
                            value={product.img}
                            onChange={handleImageChange}
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
