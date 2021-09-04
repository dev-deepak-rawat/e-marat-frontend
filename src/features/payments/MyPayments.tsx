import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PaymentSuccess from 'features/payments/PaymentSuccess';
import PaymentsComponent from 'features/payments/PaymentsComponent';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { usePayment } from 'features/payments/usePayment';

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
			<PageTitle>My Payments</PageTitle>
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
