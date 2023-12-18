import { useState, useContext, createContext, useEffect } from "react";


const CartContext = createContext()

const CartProvider = (props) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        let existing = localStorage.getItem('cart')
        if (existing) setCart(JSON.parse(existing))
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    )
};

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }