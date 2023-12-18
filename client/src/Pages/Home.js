import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { Checkbox, Radio } from "antd";
import { Prices } from '../Components/Prices'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart'
import toast from 'react-hot-toast';
import { AiOutlineReload } from "react-icons/ai";
import '../Styles/HomePage.css'
function Home() {
  const [cart, setCart] = useCart()

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  //  get All categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    //  eslint-disable next-line 
  }, [])

  // get Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      let { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || radio.length) getAllProducts()
    //  eslint-disable next-line   
  }, [])

  useEffect(() => {
    if (checked.length || radio.length) FilterProducts()
  }, [radio, checked])

  // get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal()
  }, [])

  // filter check

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  // get filtered products

  const FilterProducts = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)

    } catch (error) {
      console.log(error)
    }
  }

  // Load More

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])


  return (
    <Layout title='All products- Best Offers'>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width="100%"
        style={{ marginTop: "-70px" }} // Adjust the value according to your navbar height
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">

          {/* Category filter */}

          <h4 className="text-center"> Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price filter */}

          <h4 className="text-center mt-4"> Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}  >
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-3">
            <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'> All Products </h1>

          {/* Products display */}

          <div className="d-flex flex-wrap">

            {products?.map(p => (
              <div className="card m-2" style={{ width: '18rem' }} >
                {/* Image display */}
                <img src={`/api/v1/product/get-productPhoto/${p._id}`}
                  className="card-img-top" alt={p.name} />

                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
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
              </div>
            ))}

          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn loadmore'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1)
                }}>
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
