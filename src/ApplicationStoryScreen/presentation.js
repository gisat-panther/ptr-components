import PropTypes from 'prop-types';
import ApplicationStoryScreenBody from './AplicationStoryScreenBody';
import ApplicationStoryHeader from './ApplicationStoryHeader';
import './style.scss';

const ApplicationStoryScreen = ({isReady}) => {
	return (
		<div className="cure-ApplicationStoryScreen">
			{isReady ? (
				<>
					<ApplicationStoryHeader />
					<ApplicationStoryScreenBody />
				</>
			) : null}
		</div>
	);
};

ApplicationStoryScreen.propTypes = {
	isReady: PropTypes.bool,
};

export default ApplicationStoryScreen;
