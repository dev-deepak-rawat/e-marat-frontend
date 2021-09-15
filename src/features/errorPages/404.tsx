import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'config/hooks';

export default function PageNotFound() {
	const history = useHistory();
	const { isLoggedIn, isAdmin } = useAuth();

	let home = '/';

	if (isAdmin) {
		home = '/dashboard';
	}
	if (isLoggedIn && !isAdmin) {
		home = '/social-feed';
	}

	const handleClick = () => history.push(home);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button type="primary" onClick={handleClick}>
						Back Home
					</Button>
				}
			/>
		</div>
	);
}
