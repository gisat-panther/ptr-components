import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryMainPanelFooterLink = ({
	className,
	backgroundImage,
	children,
}) => {
	const classes = classnames('ptr-AppStoryMainPanelFooterLink', {}, className);

	return (
		<div
			className={classes}
			style={{
				backgroundImage: `url(${backgroundImage})`,
			}}
		>
			{children}
		</div>
	);
};

AppStoryMainPanelFooterLink.propTypes = {
	className: PropTypes.string,
	children: PropTypes.PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	backgroundImage: PropTypes.string,
};

export default AppStoryMainPanelFooterLink;
