import { ElementType, Suspense, lazy } from 'react';
import { useLocation, useRoutes } from "react-router-dom";

/**
 * Lazy Load
 * =====================
 */
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component: ElementType) => (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    const isMainPage = pathname.includes('/training')

    return (
      <Suspense fallback={<LoadingScreen isMainPage={isMainPage} />}>
        <Component {...props} />
      </Suspense>
    );
};

/**
 * Components
 * =====================
 */
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';

const Login      = Loadable(lazy(() => import('../pages/Login/Login')));
const Dashboard  = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
const Training   = Loadable(lazy(() => import('../pages/Training/Training')));
const Dataset    = Loadable(lazy(() => import('../pages/Dataset/Dataset')));
const Category   = Loadable(lazy(() => import('../pages/Category/Category')));
const UserAccess = Loadable(lazy(() => import('../pages/UserAccess/UserAccess')));
const User       = Loadable(lazy(() => import('../pages/User/User')));
const Logout     = Loadable(lazy(() => import('../pages/Logout/Logout')));

export default function Router() {
    return useRoutes([
        {
            path: "/login",
            element: <GuestGuard children={<Login />} />,
        },
        {
            path: "/",
            element: <AuthGuard children={<Dashboard />} />,
            children: [
                { path: '', element: <Training />, },
                { path: '/dataset', element: <Dataset />, },
                { path: '/category', element: <Category />, },
                { path: '/user_access', element: <UserAccess />, },
                { path: '/user', element: <User />, },
            ],
        },
        {
            path: "/logout",
            element: <AuthGuard children={<Logout />} />,
        },
    ])
}