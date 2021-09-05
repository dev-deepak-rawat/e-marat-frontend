export type TransactionType = {
	_id: string;
	orderId: string;
	amount: number;
	status: 'success' | 'failed' | 'pending';
	month: string;
	paymentId: string;
	processedAt: string;
	name: string;
	phone: string;
	picture: string;
	createdAt?: string;
};
