import { ReactNode } from "react";

import useHttp from "../hooks/useHttp";
import Login from "../pages/Login/Login";

type AuthGuardProps = {
    children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const {data, error} = useHttp({url: '/auth/me'})

    console.log(data);

    if (error?.response?.status == 401) {
        return <Login />
    }

    return children
}