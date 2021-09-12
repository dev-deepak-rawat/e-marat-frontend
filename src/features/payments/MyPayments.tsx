import { useState } from 'react';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PaymentSuccess from 'features/payments/PaymentSuccess';
import PaymentsComponent from 'features/payments/PaymentsComponent';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { usePayment } from 'features/payments/usePayment';
import Choice from 'features/shared/components/Choice';
import Transactions from './Transactions';

export default function MyPayments() {
	const {
		orderId,
		loading,
		paymentInfo,
		handleSuccessClick,
		displayRazorpay,
	} = usePayment();

	const [choice, setChoice] = useState(0);

	return (
		<>
			<PageTitle className="bg-transparent">
				<Choice
					{...{
						choice,
						setChoice,
						labels: ['My Payments', 'Transactions'],
					}}
				/>
			</PageTitle>
			{choice ? (
				<Transactions showTitle={false} />
			) : (
				<ContainerCard>
					{orderId ? (
						<PaymentSuccess {...{ handleSuccessClick, orderId }} />
					) : (
						<PaymentsComponent
							{...{ paymentInfo, loading, displayRazorpay }}
						/>
					)}
				</ContainerCard>
			)}
		</>
	);
}
