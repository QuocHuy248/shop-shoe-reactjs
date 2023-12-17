import React from "react";
import Card from "../card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage({ data, sortProducts }) {
    const [categories, setCategories] = useState([]);
    const [prices, setPrices] = useState([]);
    const [colors, setColors] = useState([]);

    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);

    const [productFilter, setProductFilter] = useState([]);

    const [companyFilter, setCompanyFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("0,0");
    const [colorFilter, setColorFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchFilter, setSearchFilter] = useState("");

    const [companyStatus, setCompanyStatus] = useState(false);
    const [priceStatus, setPriceStatus] = useState(false);
    const [colorStatus, setColorStatus] = useState(false);
    const [categoryStatus, setCategoryStatus] = useState(false);
    const [searchStatus, setSearchStatus] = useState(false);

    const HandleFilterProduct = () => {
        const productListFilter = products.filter(
            (item) =>
                (companyFilter === "All" ||
                    item.company.toLowerCase() === companyFilter.toLowerCase()) &&
                (item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.color.toLowerCase().includes(searchFilter.toLowerCase())) &&
                (priceFilter === "0,0" ||
                    (priceFilter === "150,150" && item.newPrice > 150) ||
                    (item.newPrice > parseInt(priceFilter.split(",")[0]) &&
                        item.newPrice <= parseInt(priceFilter.split(",")[1]))) &&
                (colorFilter === "All" || item.color.toLowerCase() === colorFilter.toLowerCase()) &&
                (categoryFilter === "All" ||
                    item.category.toLowerCase() === categoryFilter.toLowerCase())
        );
        setProductFilter(productListFilter);
    };

    useEffect(() => {
        async function fetchData() {
            setCategories(data.categories);
            setPrices(data.prices);
            setColors(data.colors);
            setCompanies(data.companies);
            setProducts(data.products);
        }
        fetchData();
    }, []);

    useEffect(() => {
        HandleFilterProduct();
    }, [companyFilter, priceFilter, searchFilter, categoryFilter, colorFilter]);

    return (
        <div className="App">
            <div className="container d-flex  border-bottom py-2 mt-2">
                <div className="d-flex align-items-center w-180">
                    <a href="#" className="">
                        <i className="fas fa-cart-plus fa-lg"></i> Shop Ecommerce
                    </a>
                </div>
                <div className="d-flex flex-grow-1 justify-content-between">
                    <div className="d-flex">
                        <input
                            type="search"
                            placeholder="Enter your shoes here"
                            className="form-control form-control-sm w-400"
                            id="search"
                            onInput={(e) => {
                                setSearchFilter(e.target.value.trim());
                                setSearchStatus(e.target.value.trim() !== "");
                            }}
                        />
                    </div>
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
                                <Link to="#">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-align-start d-flex ">
                <div className=" border-end side bar w-180 ">
                    <div className="gap-1 pt-2">
                        <div className="category ">
                            <h5 href="">Category</h5>
                            <div className="category-search form-group py-1">
                                <div className="form-check ">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="cat_0"
                                        name="category"
                                        value="All"
                                        defaultChecked={true}
                                        onChange={() => {
                                            setCategoryStatus(false);
                                            setCategoryFilter("All");
                                        }}
                                    />
                                    <label
                                        htmlFor="cat_0"
                                        role="button"
                                        className="text-decoration-underline fw-bolder"
                                    >
                                        All
                                    </label>
                                </div>
                                {categories.map((item) => (
                                    <div key={item.id} className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id={`cat_${item.id}`}
                                            name="category"
                                            value={item.name}
                                            onChange={() => {
                                                setCategoryStatus(true);
                                                setCategoryFilter(item.name);
                                            }}
                                        />
                                        <label htmlFor={`cat_${item.id}`} role="button">
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="price">
                            <h5 href="">Price</h5>
                            <div className="price-search form-group py-1">
                                <div className="form-check  ">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="price_0"
                                        name="price"
                                        defaultChecked={true}
                                        value="0,0"
                                        onChange={() => {
                                            setPriceStatus(false);
                                            setPriceFilter("0,0");
                                        }}
                                    />
                                    <label
                                        htmlFor="price_0"
                                        role="button"
                                        className="text-decoration-underline fw-bolder"
                                    >
                                        All
                                    </label>
                                </div>
                                {prices.map((item, index) => {
                                    return (
                                        <div className="form-check " key={index + 1}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id={`price_${index + 1}`}
                                                name="price"
                                                value={item.value}
                                                onChange={() => {
                                                    setPriceStatus(true);
                                                    setPriceFilter(item.value);
                                                }}
                                            />
                                            <label htmlFor={`price_${index + 1}`} role="button">
                                                {item.name}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="color">
                            <h5 href="">Color</h5>
                            <div className="color-search form-group py-1">
                                <div className="form-check  ">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="color_0"
                                        value="All"
                                        name="color"
                                        defaultChecked={true}
                                        onChange={() => {
                                            setColorStatus(false);
                                            setColorFilter("All");
                                        }}
                                    />
                                    <label
                                        htmlFor="color_0"
                                        role="button"
                                        className="text-decoration-underline fw-bolder"
                                    >
                                        All
                                    </label>
                                </div>
                                {colors.map((item) => {
                                    return (
                                        <div className="form-check " key={item.id}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id={`color_${item.id}`}
                                                name="color"
                                                style={{
                                                    backgroundColor: `${item.name}`,
                                                }}
                                                onChange={() => {
                                                    setColorStatus(true);
                                                    setColorFilter(item.name);
                                                }}
                                                value={item.name}
                                            />
                                            <label htmlFor={`color_${item.id}`} role="button">
                                                {item.name}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content flex-grow-1 ">
                    <div id="recommend" className="ps-2">
                        <h4 className="text-align-start">Recommended</h4>
                        <div className="brand text-align-start d-flex gap-1 ">
                            <button
                                className={`btn ${
                                    !companyStatus ? "btn-secondary" : "btn-outline-secondary"
                                } btn-recommend btn-sm ps-1 w-30`}
                                type="button"
                                onClick={() => {
                                    setCompanyStatus(false);
                                    setCompanyFilter("All");
                                }}
                            >
                                All product
                            </button>
                            {companies.map((item) => {
                                return (
                                    <button
                                        key={item.id}
                                        className={`btn ${
                                            companyStatus && companyFilter == item.name
                                                ? "btn-secondary"
                                                : "btn-outline-secondary"
                                        } btn-recommend btn-sm ps-1 w-30`}
                                        type="button"
                                        onClick={() => {
                                            setCompanyStatus(true);
                                            setCompanyFilter(item.name);
                                        }}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        id="product"
                        className="ps-2 py-2 d-flex flex-column justify-content-center"
                    >
                        <h4 className="text-align-start">Product</h4>
                        <div className="product row">
                            {!companyStatus &&
                            !colorStatus &&
                            !priceStatus &&
                            !categoryStatus &&
                            !searchStatus
                                ? sortProducts(products).map((item) => {
                                      return <Card key={item.id} data={item} />;
                                  })
                                : sortProducts(productFilter).map((item) => {
                                      return <Card key={item.id} data={item} />;
                                  })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
