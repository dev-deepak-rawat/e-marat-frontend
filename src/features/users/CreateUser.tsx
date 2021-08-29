import GenericForm from 'features/shared/components/form/GenericForm';
import { createUserFormData } from 'features/users/createUserForm';

export default function CreateUser() {
	return (
		<div>
			<GenericForm formData={createUserFormData} layout="vertical" />
		</div>
	);
}
