import { Button, Space, Spin } from 'antd';
import PieChartComponent from 'features/dashboard/PieChartComponent';
import {
	MONTHS_LONG,
	MONTHS_SHORT,
	STYLE_COMPONENT_THEME,
} from 'lib/constants';

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
		}[];
	};
};

export default function PaymentsComponent(props: PaymentsComponentType) {
	const { loading, displayRazorpay, paymentInfo } = props;

	const {
		pay,
		paymentMonth = '',
		isFirstPayment,
		onboardingDate,
		daysInMonth,
		amenities = [],
	} = paymentInfo;

	const [month, year] = paymentMonth.split('_');
	const monthShort = MONTHS_SHORT[+month];

	const pieChartData = amenities.map((amenity) => ({
		...amenity,
		value: amenity.fee,
		color: STYLE_COMPONENT_THEME.colors.emarat.accent,
	}));

	return loading ? (
		<Spin />
	) : (
		<>
			<Space size="large">
				<p className="sm:text-lg">Total Payment &#8377;{pay}</p>
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
			<div>
				<PieChartComponent
					data={pieChartData}
					title="Subscribed Amenities"
					uniColor
				/>
			</div>
		</>
	);
}
