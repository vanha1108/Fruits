import { createContext, useContext, useReducer } from "react";
import { getCookie } from "../cookie/cookie";
import { cartReducer } from "./Reducers";

const Cart = createContext();
const CARD = "CARD"

const Context = ({children}) =>{
    const cart =  getCookie(CARD)
    
    const [state,dispatch] = useReducer(cartReducer,{
        cart:cart,
        
    })

    return(<Cart.Provider value={{state,dispatch}}>
        {children}
    </Cart.Provider>)
}

export default Context

export const CartState = () =>{
    return useContext(Cart)
}

// export const ImportState = () =>{
//     return useContext(Cart)
// }