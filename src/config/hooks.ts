/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ROLES } from 'lib/constants';
import type { RootState, AppDispatch } from 'config/store';
import { setTitle } from 'features/shared/reducers/TopbarSlice';
import { setPosts, setUsers } from 'features/shared/reducers/SocialFeedSlice';
import { PostList, UserList } from 'features/socialFeed/SocialFeedTypes';
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

	let id = authState?.userInfo?.claims?.uniqueId;
	if (id) id = id as string;

	return {
		...authState,
		uniqueId: id,
		filterByRole: filterByRole(authState.isAdmin),
	};
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

export const useApiCall = (props: UseApiCall) => {
	const { apiUrl, reqData, initDataValue, appendToUrl, cond } = props;
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

export const useSocialFeed = () => {
	const { posts, users } = useAppSelector((state) => state.socialFeed);

	const dispatch = useAppDispatch();

	return {
		posts,
		setPosts: (p: PostList) => dispatch(setPosts(p)),
		users,
		setUsers: (u: UserList) => dispatch(setUsers(u)),
	};
};
