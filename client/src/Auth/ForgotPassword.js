import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import toast from 'react-hot-toast';
import './../Styles/AuthStyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    // submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgotPassword", { email, newPassword, answer })
            if (res && res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            // console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (

        <Layout title='Register-HorizonHub'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Reset Password</h4>
                    <div className="mb-3">
                        <input type="email" className="form-control"
                            id="exampleInputEmail" placeholder=' Enter your Email'
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control"
                            id="exampleInputAnswer" placeholder='What is your favourite Sports? '
                            value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="password" className="form-control"
                            id="exampleInputPassword1" placeholder=' Enter your Password'
                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
                    </div>

                    <button type="submit " className="btn btn-primary">
                        Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword