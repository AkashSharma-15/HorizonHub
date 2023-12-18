import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Policy from './Pages/Policy'
import PageNotFound from './Pages/PageNotFound'
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Auth/ForgotPassword";
import ProtectedAdmin from "./Components/Routes/ProtctedAdmin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from './Pages/Admin/CreateCategory'
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import UserDashBoard from "./Pages/User/UserDashBoard";
import UserProfile from './Pages/User/UserProfile'
import UserOrder from './Pages/User/UserOrder'
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminProductUpdate from "./Pages/Admin/AdminProductUpdate";
import SearchPage from "./Pages/SearchPage";
import ProductDetail from "./Pages/ProductDetail";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
import AdminOrders from "./Pages/Admin/AdminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<UserDashBoard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrder />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedAdmin />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<AdminProductUpdate />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
