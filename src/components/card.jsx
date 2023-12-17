import React from "react";

export default function Card(props) {
    const product = props.data;
    return (
        <div className="cards col-md-3 mb-4 px-2">
            <div className="card pt-2 w-16-h-17-p-10">
                <div className="avatar">
                    <img className="card-img-top" src={product.img} alt="Card image cap" />
                </div>
                <div className="card-body">
                    <h6 className="">{product.title}</h6>
                    <p className="card-text">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        (123 review)
                    </p>
                    <div className="price-card">
                        <div className="old-price">
                            <p>{product.prevPrice}</p>
                        </div>
                        <div className="new-price">
                            <p>{product.newPrice}</p>
                        </div>
                        <div className="add-cart">
                            <i className="fas fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
