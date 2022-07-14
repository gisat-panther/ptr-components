import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryMainPanelFooter = ({className, children}) => {
	const classes = classnames('ptr-AppStoryMainPanelFooter', {}, className);

	return <div className={classes}>{children}</div>;
};

AppStoryMainPanelFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default AppStoryMainPanelFooter;
