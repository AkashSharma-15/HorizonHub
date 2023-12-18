import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import toast from 'react-hot-toast';
import '../Styles/AuthStyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")

    // submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register",
                { name, email, password, address, phone, answer })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    
    return (
        <Layout title='Register-HorizonHub'>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input type="text" className="form-control"
                            id="exampleInputName" placeholder=' Enter your Name'
                            value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="email" className="form-control"
                            id="exampleInputEmail" placeholder=' Enter your Email'
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="password" className="form-control"
                            id="exampleInputPassword1" placeholder=' Enter your Password'
                            value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control"
                            id="exampleInputPhone" placeholder=' Enter your Phone'
                            value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control"
                            id="exampleInputAddress" placeholder=' Enter your Address'
                            value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control"
                            id="exampleInputAnswer" placeholder=' What is your favourite Sports?'
                            value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
