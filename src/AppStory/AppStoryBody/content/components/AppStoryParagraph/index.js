import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryParagraph = ({className, text}) => {
	const classes = classnames('ptr-AppStoryParagraph', {}, className);

	return <p className={classes}>{text}</p>;
};

AppStoryParagraph.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
};

export default AppStoryParagraph;
