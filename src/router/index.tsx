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

const Login    = Loadable(lazy(() => import('../pages/Login/Login')));
const Training = Loadable(lazy(() => import('../pages/Training/Training')));

export default function Router() {
    return useRoutes([
        {
            path: "/login",
            element: <GuestGuard children={<Login />} />,
        },
        {
            path: "/",
            element: <AuthGuard children={<Training />} />,
        }
    ])
}