import { Suspense } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

// helpers
import { APICore } from '../helpers/api/apiCore';

// hooks
import { useUser } from '../hooks/auth';

type PrivateRouteProps = {
    roles?: string;
};

const loading = () => <div className=""></div>;

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ roles, ...rest }: PrivateRouteProps) => {
    let location = useLocation();
    const [loggedInUser] = useUser();

    const api = new APICore();

    /**
     * not logged in so redirect to login page with the return url
     */
    if (api.isUserAuthenticated() === false) {
        return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
    }

    // check if route is restricted by role
    if (roles && roles.indexOf(loggedInUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Navigate to={{ pathname: '/' }} />;
    }
    return (
        <Suspense fallback={loading()}>
            <Outlet />
        </Suspense>
    );
};

export default PrivateRoute;
