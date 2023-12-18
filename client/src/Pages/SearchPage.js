import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../Context/Search'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../Context/Cart'
function SearchPage() {
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    const [values] = useSearch()
    return (
        <Layout title="Search Results" >
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>
                        {values?.results.length < 1 ? "No Products Found" :
                            `found ${values?.results.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4 justify-content-center ">
                        {values?.results.map(p => (
                            <div className="card m-2" style={{ width: '18rem' }} >
                                <img src={`/api/v1/product/get-productPhoto/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}... </p>
                                    <p className="card-text">$ {p.price} </p>
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-dark ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SearchPage
