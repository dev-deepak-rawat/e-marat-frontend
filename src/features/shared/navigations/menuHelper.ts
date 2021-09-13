/* eslint-disable @typescript-eslint/no-explicit-any */

const getCurrentUrl = (pathname?: string) => {
	const urlPathanme = pathname || window.location.pathname;
	return `/${urlPathanme.split('/')[1]}`;
};

export const getDefaultSelectedKeys = (filteredMenuData: any) => {
	const defaultSelectedKeys = [];
	const url = getCurrentUrl();

	for (const filteredMenu of filteredMenuData) {
		const { id, link } = filteredMenu;
		if (link === url) defaultSelectedKeys.push(id);
	}
	return defaultSelectedKeys;
};
