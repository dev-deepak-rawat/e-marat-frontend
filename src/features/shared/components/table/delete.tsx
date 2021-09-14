import { Dispatch, SetStateAction } from 'react';
import { ApiResponse } from 'lib/types';
import { apiRequest } from 'config/apiRequest';
import deleteConfirm from 'features/shared/components/deleteConfirm';

const Delete = <T extends unknown[]>(
	url: string,
	id: string,
	items: T,
	setItems: Dispatch<SetStateAction<T>>
) => {
	deleteConfirm(async () => {
		try {
			const response: ApiResponse = await apiRequest({
				apiUrl: url,
				appendToUrl: id,
			});

			if (response.meta.success) {
				setItems(items);
				setItems(
					items.filter(
						(item) => (item as { _id: string })._id !== id
					) as T
				);
			}
		} catch (e) {
			console.error(e);
		}
	});
};

export default Delete;
