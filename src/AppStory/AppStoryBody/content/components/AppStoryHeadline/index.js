import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryHeadline = ({className, headline}) => {
	const classes = classnames('ptr-AppStoryHeadline', {}, className);

	return <h1 className={classes}>{headline}</h1>;
};

AppStoryHeadline.propTypes = {
	className: PropTypes.string,
	headline: PropTypes.string,
};

export default AppStoryHeadline;
