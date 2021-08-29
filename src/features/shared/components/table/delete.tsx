import { Dispatch, SetStateAction } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ApiResponse } from 'lib/types';
import { apiRequest } from 'config/apiRequest';

export default <T extends unknown[]>(
	url: string,
	id: string,
	items: T,
	setItems: Dispatch<SetStateAction<T>>
) => {
	Modal.confirm({
		title: 'Are you sure?',
		icon: <ExclamationCircleOutlined />,
		content: 'This action is not recoverable',
		async onOk() {
			try {
				const response: ApiResponse = await apiRequest({
					apiUrl: url,
					appendToUrl: id,
				});

				console.log(response);

				if (response.meta.success) {
					setItems(items);
					setItems(
						items.filter(
							(item) => (item as { _id: string })._id != id
						) as T
					);
				}
				// else {
				// }
			} catch (e) {
				console.log('errors!');
			}
		},
	});
};
