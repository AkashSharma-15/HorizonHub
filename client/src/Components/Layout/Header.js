import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../Hooks/useCategory'
import { useCart } from '../../Context/Cart'
import { Badge } from 'antd'

function Header() {
    const [cart] = useCart()
    const [auth, setAuth] = useAuth()
    const categories = useCategory()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')

        toast.success("Logout Successfully")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" style={{ zIndex: 1000 }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    🛒 HorizonHub
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput />
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">

                            <Link className="nav-link dropdown-toggle" to={"/categories"}
                                data-bs-toggle="dropdown">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to={"/categories"}>
                                        All Categories
                                    </Link>
                                </li>
                                {categories?.map((c) => (
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/category/${c.slug}`}>
                                            {c.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>


                        {
                            !auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </>
                            )
                                : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><NavLink className="dropdown-item"
                                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
                                                    Dashboard</NavLink></li>
                                                <li className="nav-item">
                                                    <NavLink onClick={handleLogout} className="dropdown-item" to="/login">Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>


                                    </>
                                )
                        }

                        <li className="nav-item">
                            <Badge count={cart?.length} showZero>
                                <NavLink className="nav-link" to="/cart">Cart</NavLink>
                            </Badge>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Header
