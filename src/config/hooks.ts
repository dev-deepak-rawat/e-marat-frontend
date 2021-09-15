/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ROLES } from 'lib/constants';
import type { RootState, AppDispatch } from 'config/store';
import { setTitle } from 'features/shared/reducers/TopbarSlice';
import {
	setPosts,
	setPostCommentsCount,
	addUser,
} from 'features/shared/reducers/SocialFeedSlice';
import {
	PostList,
	PostCountType,
	UserList,
} from 'features/socialFeed/SocialFeedTypes';
import { apiRequest } from 'config/apiRequest';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const filterByRole = (isAdmin: boolean) => (option: { role?: string }) => {
	const { role } = option;
	const currRole = isAdmin ? ROLES.ADMIN : ROLES.RESIDENT;
	if (!role) return true;
	return role === currRole;
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
	const isMobileSize = useMediaQuery({ query: '(max-width: 480px)' });
	return { isMobileSize };
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
	isSkip?: boolean;
};

export const useApiCall = (props: UseApiCall) => {
	const { apiUrl, reqData, initDataValue, appendToUrl, cond, isSkip } = props;
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(initDataValue);
	const [isFetchedOnce, setIsFetchedOnce] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const response = await apiRequest({
			apiUrl,
			data: reqData,
			appendToUrl: isSkip ? `?skip=${cond}` : appendToUrl,
		});
		const { data: resData = initDataValue } = response;
		setData(resData);
		setIsFetchedOnce(true);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [cond]);

	return { data, loading, isFetchedOnce };
};

type UseInfiniteScrollApiCall = {
	apiUrl: string;
};
export const useInfiniteScrollApiCall = (props: UseInfiniteScrollApiCall) => {
	const [skip, setSkip] = useState(0);
	const [isNoMoreData, setIsNoMoreData] = useState(false);
	const [list, setList] = useState<any[]>([]);

	const { loading, data, isFetchedOnce } = useApiCall({
		apiUrl: props.apiUrl,
		initDataValue: [],
		cond: skip,
		isSkip: true,
	});

	useEffect(() => {
		if (!data.length) {
			skip && setIsNoMoreData(true);
		} else {
			setList([...list, ...data]);
		}
	}, [data]);

	return { setSkip, isNoMoreData, loading, isFetchedOnce, list };
};

export const useSocialFeed = () => {
	const { posts, users } = useAppSelector((state) => state.socialFeed);

	const dispatch = useAppDispatch();

	return {
		posts,
		setPosts: (p: PostList) => dispatch(setPosts(p)),
		setPostCommentsCount: (p: PostCountType) =>
			dispatch(setPostCommentsCount(p)),
		users,
		addUser: (u: UserList) => dispatch(addUser(u)),
	};
};
