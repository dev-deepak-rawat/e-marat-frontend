import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const confirm = (onConfim: () => unknown) =>
	Modal.confirm({
		title: 'Are you sure?',
		icon: <ExclamationCircleOutlined />,
		content: 'This action is not recoverable',
		onOk: onConfim,
	});

export default confirm;
