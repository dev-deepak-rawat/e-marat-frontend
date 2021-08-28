import { ROLES } from 'lib/constants';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import type { RootState, AppDispatch } from 'config/store';
import { setTitle } from 'features/shared/reducers/TopbarSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const filterByRole = (isAdmin: boolean) => (option: { role?: string }) => {
	const { role } = option;
	if (!role) return true;
	if (isAdmin && role === ROLES.ADMIN) return true;
	if (!isAdmin && role === ROLES.RESIDENT) return true;
	return false;
};

export const useAuth = () => {
	const authState = useAppSelector((state) => state.auth);
	return { ...authState, filterByRole: filterByRole(authState.isAdmin) };
};

export const useOrientation = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
	return { isMobile };
};


export const useTopbar = () => {
    const { title } = useAppSelector(state => state.topbar);
    const dispatch = useAppDispatch();
    const setUrlTitle = (ti: string) => dispatch(setTitle(ti));
    return { title, setUrlTitle };
}