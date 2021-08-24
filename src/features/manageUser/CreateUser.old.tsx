import { apiRequest } from 'app/apiRequest';
import Button from 'features/appStyledComponents/Button.style';
import FlexRow from 'features/appStyledComponents/FlexRow.style';
import FormContainer from 'features/appStyledComponents/FormContainer.style';
import {
	SelectBox,
	InputBox,
	InputContainer,
	Error,
} from 'features/appStyledComponents/InputBox.style';
import Title from 'features/appStyledComponents/Title.style';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	firstName: string;
	lastName: string;
	role: string;
	phone: string;
	flat: string;
};

export default function CreateUser() {
	const [disable, setDisable] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const { role = '', ...restData } = data;
		const isAdmin = role === 'admin';
		setDisable(true);
		await apiRequest({
			apiUrl: 'postUser',
			data: { ...restData, isAdmin },
		});
		setDisable(false);
	};

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<Title>User Details</Title>
			<FlexRow>
				<InputContainer>
					<InputBox
						id="firstName"
						type="text"
						placeholder="First Name"
						defaultValue=""
						{...register('firstName', { required: true })}
					/>
					{errors.firstName && <Error>This field is required</Error>}
				</InputContainer>

				<InputContainer>
					<InputBox
						type="text"
						placeholder="Last Name"
						defaultValue=""
						{...register('lastName', { required: true })}
					/>
					{errors.lastName && <Error>This field is required</Error>}
				</InputContainer>

				<InputContainer>
					<SelectBox
						defaultValue=""
						{...register('role', { required: true })}
					>
						<option value="" disabled hidden>
							--Select Role--
						</option>
						<option value="admin">Admin</option>
						<option value="resident">Resident</option>
					</SelectBox>
					{errors.role && <Error>This field is required</Error>}
				</InputContainer>

				<InputContainer>
					<InputBox
						type="tel"
						placeholder="Mobile No."
						defaultValue=""
						{...register('phone', {
							required: 'Required',
							maxLength: { value: 10, message: 'Invalid length' },
							pattern: {
								value: /^[0-9]{3}[0-9]{3}[0-9]{4}$/,
								message: 'Invalid phone no.',
							},
						})}
					/>
					{errors.phone && <Error>{errors.phone?.message}</Error>}
				</InputContainer>

				<InputContainer>
					<InputBox
						type="text"
						placeholder="Flat No."
						defaultValue=""
						{...register('flat', { required: true })}
					/>
					{errors.flat && <Error>This field is required</Error>}
				</InputContainer>
			</FlexRow>
			<Button type="submit" disabled={disable}>
				Submit
			</Button>
		</FormContainer>
	);
}
