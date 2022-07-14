import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStorySidePanelFooter = ({className, children}) => {
	const classes = classnames('ptr-AppStorySidePanelFooter', {}, className);

	return <div className={classes}>{children}</div>;
};

AppStorySidePanelFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default AppStorySidePanelFooter;
