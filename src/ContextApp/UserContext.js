import React, { Children, use, useState } from "react";
export const UserContext = React.createContext();


const UseProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [Cart, setCart] = useState(0)


    const TotalQty = (data) => {
        setCart(data)
        console.log(data)

    }

    return (
        <UserContext.Provider value={{ TotalQty, userData, setUserData, Cart, setCart }} >
            {children}
        </UserContext.Provider>
    )
}
export default UseProvider;


// ContextAPI
// set vào
// lấy ra
// khi reload lại trang thì sẽ mất 