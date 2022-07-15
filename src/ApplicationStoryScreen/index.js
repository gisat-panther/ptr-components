import PropTypes from 'prop-types';
import './style.scss';

const ApplicationStoryScreen = ({isReady, children}) => {
	return (
		<div className="cure-ApplicationStoryScreen">
			{isReady ? children : null}
		</div>
	);
};

ApplicationStoryScreen.propTypes = {
	isReady: PropTypes.bool,
	children: PropTypes.any,
};

export default ApplicationStoryScreen;
