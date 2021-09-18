import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { Modal } from 'antd';

const confirm = (onConfim: () => unknown) =>
	Modal.confirm({
		title: 'Are you sure?',
		icon: <AiOutlineExclamationCircle />,
		content: 'This action is not recoverable',
		onOk: onConfim,
	});

export default confirm;
