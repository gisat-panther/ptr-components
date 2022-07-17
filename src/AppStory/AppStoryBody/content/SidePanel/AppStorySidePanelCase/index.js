import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStorySidePanelCase = ({className, children}) => {
	const classes = classnames('ptr-AppStorySidePanelCase', {}, className);

	return <div className={classes}>{children}</div>;
};

AppStorySidePanelCase.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default AppStorySidePanelCase;
