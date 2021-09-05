export type StatusType = 'raised' | 'progress' | 'resolved' | 'rejected';

export type ComplaintUType = {
	_id?: string;
	userId: string;
	amenityId: string;
	description: string;
	status: StatusType;
	comment: string;
	createdAt?: string;
	updatedAt?: string;
};

export type ComplaintType = {
	_id?: string;
	description: string;
	status: StatusType;
	comment: string;
	createdAt?: string;
	amenityName?: string;
	amenityFee: ?string;
	amenityIcon?: string;
	userName?: string;
	userPhone?: string;
	userFlat?: string;
};
