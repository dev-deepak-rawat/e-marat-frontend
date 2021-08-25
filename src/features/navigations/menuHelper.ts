// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDefaultSelectedKeys = (filteredMenuData: any) => {
	const defaultOpenKeys = [];
	const defaultSelectedKeys = [];
	const { pathname } = window.location;
	const url = `/${pathname.split('/')[1]}`;

	for (const filteredMenu of filteredMenuData) {
		const { options = [], id, link } = filteredMenu;
		if (options.length) {
			for (const option of options) {
				if (option.link === url) {
					defaultSelectedKeys.push(option.id);
					defaultOpenKeys.push(id);
				}
			}
		} else if (link === url) defaultSelectedKeys.push(id);
	}
	return { defaultOpenKeys, defaultSelectedKeys };
};
