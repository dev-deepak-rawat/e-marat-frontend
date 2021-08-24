import GenericForm from 'features/common/GenericForm/GenericForm';
import { createUserFormData } from './createUserForm';

export default function CreateUser() {
	return (
		<div>
			<GenericForm formData={createUserFormData} />
		</div>
	);
}
