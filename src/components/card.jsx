import React from "react";
import ProductService from "../service/productService";
import { toast } from "react-toastify";

export default function Card(props) {
    const product = props.data;
    const addtoCart = async (id) => {
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
                quantity: 1,
            };
            await ProductService.addNewProductToCart(ProductAdded);
            toast.success("Add to cart successfully");
            return;
        }
    };

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
                        <div className="add-cart" onClick={() => addtoCart(product.id)}>
                            <i className="fas fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
