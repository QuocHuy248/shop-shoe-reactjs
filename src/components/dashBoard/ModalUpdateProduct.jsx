import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import ModalTitle from "react-bootstrap/ModalTitle";
import ProductService from "../../service/productService";

export default function ModalUpdateProduct({
    show,
    handleCloseModal,
    handleUpdateProducts,
    product,
    handleChangeProduct,
}) {
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [companies, setCompanies] = useState([]);

    const getAll = async () => {
        const categoriesData = await ProductService.getAllCategories();
        const companiesData = await ProductService.getAllCompanies();
        const colorsData = await ProductService.getAllColors();
        setCompanies(companiesData);
        setCategories(categoriesData);
        setColors(colorsData);
        console.log(colorsData);
    };
    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            <Modal size="lg" centered show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal create</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="row ">
                            <div className="col-lg-6">
                                <label htmlFor="" className="font-edit">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={product.title}
                                    name="title"
                                    onChange={handleChangeProduct}
                                />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="" className="font-edit">
                                    Company
                                </label>
                                <select
                                    name="company"
                                    id=""
                                    className="form-control select-form"
                                    defaultValue={product.company}
                                    onChange={handleChangeProduct}
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
                        <div className="row py-1">
                            <div className="col-lg-6">
                                <label htmlFor="" className="font-edit">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id=""
                                    className="form-control select-form"
                                    value={product.category}
                                    onChange={handleChangeProduct}
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
                                <label htmlFor="" className="font-edit">
                                    Color
                                </label>
                                <select
                                    name="color"
                                    id=""
                                    className="form-control select-form "
                                    value={product.color}
                                    onChange={handleChangeProduct}
                                >
                                    {colors.map((item) => {
                                        return (
                                            <option value={item.name} key={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row py-1">
                            <div className="col-lg-6">
                                <label htmlFor="" className="font-edit">
                                    Prev Price
                                </label>
                                <input
                                    name="prevPrice"
                                    type="text"
                                    className="form-control"
                                    defaultValue={product.prevPrice}
                                    onChange={handleChangeProduct}
                                />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="" className="font-edit">
                                    New Price
                                </label>
                                <input
                                    name="newPrice"
                                    type="text"
                                    className="form-control"
                                    defaultValue={product.newPrice}
                                    onChange={handleChangeProduct}
                                />
                            </div>
                        </div>
                        <div className="row py-1">
                            <div className="col-lg-6">
                                <label htmlFor="" className="font-edit">
                                    Img URL
                                </label>
                                <input
                                    name="img"
                                    type="text"
                                    className="form-control"
                                    defaultValue={product.img}
                                    onChange={handleChangeProduct}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleUpdateProducts(product);
                            handleCloseModal();
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
