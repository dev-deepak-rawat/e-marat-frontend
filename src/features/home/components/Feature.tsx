import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type PropsType = {
	title: string;
	number: string;
	icon: IconDefinition;
};

export default function Feature({ title, number, icon }: PropsType) {
	return (
		<div className="bg-white shadow-around px-7 py-10 flex h-full rounded-md">
			<FontAwesomeIcon icon={icon} className="text-5xl" />
			<div className="pl-7">
				<h4 className="font-bold text-4xl">{number}</h4>
				<p className="font-semi-bold text-lg">{title}</p>
			</div>
		</div>
	);
}
