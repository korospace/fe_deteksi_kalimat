import { ReactNode, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

// utils
import axios from "../utils/axios";
import { GetLocalToken } from "../utils/auth";
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
                await axios.get('/auth/me');
                setIsAuthenticated(true);
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
