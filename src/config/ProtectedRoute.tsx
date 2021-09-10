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
	const currRole = isAdmin ? ROLES.ADMIN : ROLES.RESIDENT;
	if (isLoggedIn) {
		if (!role) return <Route {...routeProps} />;
		if (role === currRole) return <Route {...routeProps} />;
		return <Redirect to={{ pathname: '/404' }} />;
	}
	return <Redirect to={{ pathname: '/' }} />;
}
