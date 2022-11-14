import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Root from './Root';


const Home = React.lazy(() => import('../pages/Home'));
const Explore = React.lazy(() => import('../pages/Explore'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    return useRoutes([
        {
            // root route
            path: '/',
            element: <Root />,
        },
        {
            // public routes
            path: '/',
            children: [
                {
                    path: 'home',
                    element: <LoadComponent component={Home} />,
                },
                {
                    path: 'explore',
                    element: <LoadComponent component={Explore} />,
                },
            ]
        },
    ]);
};

export default AllRoutes;
