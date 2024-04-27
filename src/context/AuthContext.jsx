import React, {createContext, useState,useEffect} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loggedIn, setIsLoggedIn] = useState(undefined);
    const token = localStorage.getItem("token");

    async function getLoggedIn(){
        const request = await fetch("https://taskduty-server-dil8.onrender.com/api/v1/isLoggedIn",{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();
        console.log(response);
        setIsLoggedIn(response)
    }

    // log out function
    const logout = ()=>{
        localStorage.removeItem("token")
        location.reload()
    }

    useEffect(()=>{
        getLoggedIn()
    },[])

    return(
        <AuthContext.Provider
        value={{
            getLoggedIn,
            loggedIn,
            setIsLoggedIn,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;