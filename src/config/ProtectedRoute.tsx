import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from 'config/hooks';
import { ROLES } from 'lib/constants';

export type ProtectedRouteProps = {
	role?: string;
} & RouteProps;

export default function ProtectedRoute({
	role,
	...routeProps
}: ProtectedRouteProps) {
	const { isLoggedIn, isAdmin } = useAuth();
	if (isLoggedIn) {
		if (!role) return <Route {...routeProps} />;
		if (role === ROLES.ADMIN && isAdmin) return <Route {...routeProps} />;
		if (!isAdmin && role === ROLES.RESIDENT)
			return <Route {...routeProps} />;
		return <Redirect to={{ pathname: '/404' }} />;
	}
	return <Redirect to={{ pathname: '/' }} />;
}
