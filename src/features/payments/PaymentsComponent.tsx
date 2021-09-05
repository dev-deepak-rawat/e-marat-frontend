import { Button, Image, Space, Spin } from 'antd';
import placeholderImg from 'assets/images/placeholder.svg';
import { useOrientation } from 'config/hooks';
import PieChartComponent from 'features/dashboard/PieChartComponent';
import { COLOR_CODES, MONTHS_LONG, MONTHS_SHORT } from 'lib/constants';

type PaymentsComponentType = {
	loading: boolean;
	displayRazorpay: () => Promise<void>;
	paymentInfo: {
		pay: number;
		paymentMonth: string;
		isFirstPayment?: boolean;
		onboardingDate?: number;
		daysInMonth?: number;
		amenities: {
			name: string;
			fee: number;
			_id: string;
			icon: string;
		}[];
		monthlyFee: string;
	};
};

export default function PaymentsComponent(props: PaymentsComponentType) {
	const { loading, displayRazorpay, paymentInfo } = props;
	const { isMobile } = useOrientation();
	const {
		pay,
		paymentMonth = '',
		isFirstPayment,
		onboardingDate,
		daysInMonth,
		amenities = [],
		monthlyFee,
	} = paymentInfo;

	const [month, year] = paymentMonth.split('_');
	const monthShort = MONTHS_SHORT[+month];

	const pieChartData = amenities.map((amenity, index) => ({
		...amenity,
		value: amenity.fee,
		color: COLOR_CODES[index],
	}));

	return loading ? (
		<Spin />
	) : (
		<>
			<div className="mb-4">
				<Space size="large">
					<p className="sm:text-lg">Total Payment ₹{pay}</p>
					<Button
						type="primary"
						disabled={!pay}
						onClick={displayRazorpay}
					>
						Pay Now
					</Button>
				</Space>
				{Boolean(pay) && (
					<p className="mt-4 font-light">
						Payment for {MONTHS_LONG[+month]} {year}
					</p>
				)}
				{isFirstPayment && (
					<p className="font-light text-sm">
						{`${onboardingDate} ${monthShort} - ${daysInMonth} ${monthShort}`}
					</p>
				)}
			</div>

			<div className="pt-6 border-t-2">
				Fare Breakdown per Month
				<div className="sm:flex">
					<div className="sm:w-2/5">
						{amenities.map(({ icon, name, fee, _id }) => (
							<div key={_id} className="w-3/4 my-4">
								<div className="flex justify-between">
									<Image
										className="rounded-full"
										width={35}
										height={35}
										preview={false}
										src={icon || placeholderImg}
										fallback={placeholderImg}
									/>
									<span className="capitalize">{name}</span>
									<span>₹{fee}</span>
								</div>
							</div>
						))}
						<span className="font-semibold">
							Total Monthly Fee: ₹{monthlyFee}
						</span>
					</div>
					{!isMobile && (
						<div>
							<PieChartComponent
								data={pieChartData}
								title=""
								isPayment
								innerContent={`Total ₹${monthlyFee}`}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
