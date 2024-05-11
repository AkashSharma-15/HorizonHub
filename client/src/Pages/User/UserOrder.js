import React, { useState, useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../Context/auth'
import moment from 'moment'
function UserOrder() {
    const [auth] = useAuth()
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/orders')
            setOrders(data)
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <Layout title=' Orders'>
            <div className="container-fluid m-3 p-3 dashboard ">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className='text-center'>My Orders</h2>
                        {
                            orders?.map((order, index) => {
                                return (
                                    <div className="border shadow mt-3">
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Date</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{order?.status}</td>
                                                    <td>{moment(order?.createdAt).fromNow()}</td>
                                                    <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{order?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {order?.products?.map((p, i) => (
                                                <div className="row card flex-row" key={p._id}>
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`/api/v1/product/get-productPhoto/${p._id}`}
                                                            className="card-img-top"
                                                            alt={p.name}
                                                            width="100%"
                                                            height={"130px"}
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>{p.name}</p>
                                                        <p>Price : {p.price}</p>
                                                        <p>description : {p.description.substring(0, 30)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserOrder
