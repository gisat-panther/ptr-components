import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryLink = ({className, text, linkDisplay, link}) => {
	const classes = classnames('ptr-AppStoryLink', {}, className);

	return (
		<li>
			{text}
			<a className={classes} href={link}>
				{linkDisplay}
			</a>
		</li>
	);
};

AppStoryLink.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	link: PropTypes.string,
	linkDisplay: PropTypes.string,
};

export default AppStoryLink;
