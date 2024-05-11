import React, { useState, useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Option } = Select


function CreateProduct() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [shipping, setShipping] = useState("")
  const [quantity, setQuantity] = useState("")
  const [category, setCategory] = useState("")


  // get all categiory

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory()
  }, [])

  // create Product

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {

        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong");
    }
  };


  return (
    <Layout title='Dashboard- create products'>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false} placeholder="Select a category" size="large" showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* upload photo */}
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photos"}
                  <input type="file" name="photo" accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>

              {/* show photo */}
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="Product photo" height={'200px'} className='img img-responsive' />
                  </div>
                )}
              </div>

              {/* Ading product Info */}

              {/* name */}
              <div className="mb-3">
                <input type="text" value={name} placeholder='Write a Name' className='form-control'
                  onChange={(e) => setName(e.target.value)} />
              </div>

              {/* description */}
              <div className="mb-3">
                <textarea type="text" value={description} placeholder="write a description"
                  className="form-control" onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* price */}
              <div className="mb-3">
                <input type="number" value={price} placeholder="write a Price"
                  className="form-control" onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* quantity */}
              <div className="mb-3">
                <input type="number" value={quantity} placeholder="write a quantity"
                  className="form-control" onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping */}
              <div className="mb-3">
                <Select bordered={false} placeholder="Select Shipping " size="large"
                  showSearch className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
