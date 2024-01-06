import { ReactNode, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";

// utils
import axios from "../utils/axios";
import { GetLocalToken } from "../utils/auth";

type AuthGuardProps = {
    children: ReactNode;
};

const GuestGuard = ({ children }: AuthGuardProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common.Authorization = GetLocalToken();
                await axios.get('/user/me');
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

    return isAuthenticated == false ? <>{children}</> : <Navigate to={'/'} replace={true}/>;
};

export default GuestGuard;
