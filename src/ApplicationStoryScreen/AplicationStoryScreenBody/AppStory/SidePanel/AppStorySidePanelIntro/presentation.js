import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStorySidePanelIntro = ({className, children}) => {
	const classes = classnames('ptr-AppStorySidePanelIntro', {}, className);

	return <div className={classes}>{children}</div>;
};

AppStorySidePanelIntro.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default AppStorySidePanelIntro;
