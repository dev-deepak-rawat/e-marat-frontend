import GenericForm from 'features/shared/components/GenericForm';
import { createUserFormData } from './createUserForm';

export default function CreateUser() {
	return (
		<div>
			<GenericForm formData={createUserFormData} layout="vertical" />
		</div>
	);
}
