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
const Dashboard  = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
const Training   = Loadable(lazy(() => import('../pages/Training/Training')));

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Dashboard />,
            children: [
                { path: '', element: <Training />, },
            ],
        },
    ])
}