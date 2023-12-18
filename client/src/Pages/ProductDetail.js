import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';
import toast from 'react-hot-toast';
import '../Styles/ProductDetailsStyles.css';

function ProductDetail() {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    // get product Details
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug, getProduct]);

    // get similar products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="row container product-details" style={{ background: 'linear-gradient(to right, #b3cdd1, #ffecb3)' }}>
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/get-productPhoto/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height={'300px'}
                        width={'300px'}
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>
                        Price: {product?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button
                        className="btn btn-dark ms-1 btn-sm"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success('Item Added to cart');
                        }}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
            <hr />

            {/* similar products */}
            <div className="row container similar-products" style={{ background: 'linear-gradient(to right, #b3cdd1, #ffecb3)' }}>
                <h6>Similar Products ➡️</h6>
                {relatedProducts?.map((p) => (
                    <div className="card m-2" key={p._id}>
                        <img
                            src={`/api/v1/product/get-productPhoto/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                        />
                        <div className="card-body">
                            <div className="card-name-price">
                                <h5 className="card-title">{p.name}</h5>
                                <h5 className="card-title card-price">
                                    {p.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </h5>
                            </div>
                            <p className="card-text ">{p.description.substring(0, 60)}...</p>
                            <div className="card-name-price">
                                <button
                                    className="btn btn-info ms-1"
                                    onClick={() => navigate(`/product/${p.slug}`)}
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default ProductDetail;
