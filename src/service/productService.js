import axios from "axios";

const ProductService = {
    getAllProducts: async () => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/products")
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getAllPrices: async () => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/prices")
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getAllColors: async () => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/colors")
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getAllCategories: async () => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/categories")
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getAllCompanies: async () => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/companies")
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    create: async (obj) => {
        return axios
            .post("https://shoe-luxury-shop-json-server.vercel.app/products", obj)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    edit: async (obj, id) => {
        return axios
            .patch("https://shoe-luxury-shop-json-server.vercel.app/products/" + id, obj)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getProductById: async (id) => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/products/" + id)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    delete: async (id) => {
        return axios
            .delete("https://shoe-luxury-shop-json-server.vercel.app/products/" + id)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    deleteProductCart: async (id) => {
        return axios
            .delete("https://shoe-luxury-shop-json-server.vercel.app/cartDetails/" + id)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    increaseQuantityCart: async (obj, id) => {
        return axios
            .patch("https://shoe-luxury-shop-json-server.vercel.app/cartDetails/" + id, obj)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    addNewProductToCart: async (obj) => {
        return axios
            .post("https://shoe-luxury-shop-json-server.vercel.app/cartDetails/", obj)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getAllCartDetail: async () => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/cartDetails")
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    findCartDetailById: async (id) => {
        return axios
            .get("https://shoe-luxury-shop-json-server.vercel.app/cartDetails/" + id)
            .then((resp) => {
                console.log(resp.data);
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
export default ProductService;
