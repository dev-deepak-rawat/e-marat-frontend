/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ROLES } from 'lib/constants';
import type { RootState, AppDispatch } from 'config/store';
import { setTitle } from 'features/shared/reducers/TopbarSlice';
import { apiRequest } from 'config/apiRequest';

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
	const { title } = useAppSelector((state) => state.topbar);
	const dispatch = useAppDispatch();
	const setUrlTitle = (ti: string) => dispatch(setTitle(ti));
	return { title, setUrlTitle };
};

type UseApiCall = {
	apiUrl: string;
	reqData?: any;
	initDataValue: any;
	appendToUrl?: string;
	cond?: number;
};

export const useApiCall = ({
	apiUrl,
	reqData,
	initDataValue,
	appendToUrl,
	cond,
}: UseApiCall) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(initDataValue);

	const fetchData = async () => {
		setLoading(true);
		const response = await apiRequest({
			apiUrl,
			data: reqData,
			appendToUrl,
		});
		const { data: resData = initDataValue } = response;
		setData(resData);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [cond]);

	return { data, loading };
};
