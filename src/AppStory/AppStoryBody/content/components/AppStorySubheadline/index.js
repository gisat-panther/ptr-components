import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStorySubheadline = ({className, subheadline}) => {
	const classes = classnames('ptr-AppStorySubheadline', {}, className);
	return <h2 className={classes}>{subheadline}</h2>;
};

AppStorySubheadline.propTypes = {
	className: PropTypes.string,
	subheadline: PropTypes.string,
};

export default AppStorySubheadline;
