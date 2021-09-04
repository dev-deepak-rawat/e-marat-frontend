import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PaymentSuccess from 'features/payments/PaymentSuccess';
import PaymentsComponent from 'features/payments/PaymentsComponent';
import { usePayment } from './usePayment';

export default function MyPayments() {
	const {
		orderId,
		loading,
		paymentInfo,
		handleSuccessClick,
		displayRazorpay,
	} = usePayment();

	return (
		<>
			<div className="text-lg uppercase mx-0 px-0">My Payments</div>
			<ContainerCard>
				{orderId ? (
					<PaymentSuccess {...{ handleSuccessClick, orderId }} />
				) : (
					<PaymentsComponent
						{...{ paymentInfo, loading, displayRazorpay }}
					/>
				)}
			</ContainerCard>
		</>
	);
}
