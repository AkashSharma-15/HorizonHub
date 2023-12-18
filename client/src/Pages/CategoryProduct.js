import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/CategoryProductStyles.css';

function CategoryProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const params = useParams();

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) getProductsByCategory();
    }, [params?.slug]);

    return (
        <Layout>
            <div className="container mt-3 category">
                <h2 className="text-center" style={{ marginTop: '-70px' }}>Category - {category?.name}</h2>
                <h6 className="text-center">{products?.length} results found</h6>
                <div className="row justify-content-center">
                    {products?.map((p) => (
                        <div className="col-md-4 mb-3" key={p._id}>
                            <div className="card">
                                <img
                                    src={`/api/v1/product/get-productPhoto/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <div className="card-name-price">
                                        <h5 className="card-price">
                                            {p.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text">{p.description.substring(0, 60)}...</p>
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
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default CategoryProduct;
