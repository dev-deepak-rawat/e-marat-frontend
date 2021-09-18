import { IconType } from 'react-icons/lib';

export type PropsType = {
	title: string;
	number: string;
	icon: IconType;
};

export default function Feature({ title, number, icon }: PropsType) {
	return (
		<div className="bg-white shadow-around px-7 py-10 flex h-full rounded-md">
			<span className="text-5xl">{icon}</span>
			<div className="pl-7">
				<h4 className="font-bold text-4xl">{number}</h4>
				<p className="font-semi-bold text-lg">{title}</p>
			</div>
		</div>
	);
}
