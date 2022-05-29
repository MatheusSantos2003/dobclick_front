import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, createContext, useEffect } from "react";
import { ResponseModel } from "../models/Response.model";
import User from "../models/User.model";

const apiURL = import.meta.env.VITE_APIURL;

interface contextInterface {
    user: User | null,
    Login: (user: User) => Promise<ResponseModel<any>>,
    Logout: () => void,
    isAuthenticated: boolean
}

export const AuthContext = createContext<contextInterface>({} as contextInterface);

export const AuthProvider = (props: any) => {
    const [user, setUser] = useState<User | null>(new User());



    async function Login(user: User): Promise<ResponseModel<any>> {
        const response = await axios.post<ResponseModel<any>>(apiURL + "/usuarios/login", user);

        if (response.data.success == true) {
            var userdata: User = jwtDecode(response.data.data);
            setUser(userdata);
            localStorage.setItem("AppUsuario", JSON.stringify(userdata));
            return response;
        } else {
            return response;
        }
        // await axios.post<ResponseModel<any>>(apiURL + "/usuarios/login", user).then((res => {


        //     if (res.data.success == true) {
        //         setUser(jwtDecode(res.data.data));
        //         setIsAuthenticated(true);

        //     } else {
        //         setIsAuthenticated(false);

        //     }

        // })).catch((error) => {
        //     setIsAuthenticated(false);
        // });

    }

    function Logout() {
        localStorage.removeItem("AppUsuario");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: Boolean(user), user, Login, Logout }}>
            {props.children}
        </AuthContext.Provider>
    )


}