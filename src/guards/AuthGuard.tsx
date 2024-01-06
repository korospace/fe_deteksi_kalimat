import { ReactNode, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

// utils
import axios from "../utils/axios";
import { GetLocalToken, SetLocalUserInfo } from "../utils/auth";
// login
import Login from "../pages/Login/Login";

type AuthGuardProps = {
    children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common.Authorization = GetLocalToken();
                const response = await axios.get('/user/me');
                setIsAuthenticated(true);
                SetLocalUserInfo(response.data.data)
            } catch (error: any) {
                if (error.response?.status === 401) {
                    setIsAuthenticated(false);
                } else {
                    enqueueSnackbar("Terjadi kesalahan pada server", { variant: 'error' });
                }
            }
        };

        fetchData();
    }, []);

    return isAuthenticated ? <>{children}</> : <Login />;
};

export default AuthGuard;
