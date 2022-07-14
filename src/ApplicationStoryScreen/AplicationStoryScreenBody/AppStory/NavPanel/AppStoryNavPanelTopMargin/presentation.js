import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryNavPanelTopMargin = className => {
	const classes = classnames('ptr-AppStoryNavPanelTopMargin', {}, className);

	return <div className={classes}></div>;
};

AppStoryNavPanelTopMargin.propTypes = {
	className: PropTypes.string,
};

export default AppStoryNavPanelTopMargin;
