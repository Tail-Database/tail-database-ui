import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Root from './Root';


const Home = React.lazy(() => import('../pages/Home'));
const Explore = React.lazy(() => import('../pages/Explore'));
const Tail = React.lazy(() => import('../pages/Tail'));
const AddTail = React.lazy(() => import('../pages/AddTail'));
const UpdateTail = React.lazy(() => import('../pages/UpdateTail'));

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
                {
                    path: 'tail',
                    children: [
                        {
                            path: ':hash',
                            element: <LoadComponent component={Tail} />
                        },
                    ],
                },
                {
                    path: 'addTail',
                    element: <LoadComponent component={AddTail} />,
                },
                {
                    path: 'updateTail',
                    children: [
                        {
                            path: ':hash',
                            element: <LoadComponent component={UpdateTail} />
                        },
                    ],
                },
            ]
        },
    ]);
};

export default AllRoutes;
