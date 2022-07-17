import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const AppStory = ({className, isReady, children}) => {
	const classes = classnames('ptr-AppStory', {}, className);
	return <div className={classes}>{isReady ? children : null}</div>;
};

AppStory.propTypes = {
	className: PropTypes.string,
	isReady: PropTypes.bool,
	children: PropTypes.any,
};

export default AppStory;
