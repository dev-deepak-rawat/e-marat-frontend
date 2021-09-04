import { Button, Result } from 'antd';

type PaymentSuccessProps = {
	orderId: string;
	handleSuccessClick: () => void;
};

export default function PaymentSuccess(props: PaymentSuccessProps) {
	return (
		<Result
			status="success"
			title="Successfull Payment!"
			subTitle={`Order number: ${props.orderId}. It may takes 1-5 minutes to reflect payment, Please wait.`}
			extra={[
				<Button
					type="primary"
					key="confirm"
					onClick={props.handleSuccessClick}
				>
					Back To Screen
				</Button>,
			]}
		/>
	);
}
