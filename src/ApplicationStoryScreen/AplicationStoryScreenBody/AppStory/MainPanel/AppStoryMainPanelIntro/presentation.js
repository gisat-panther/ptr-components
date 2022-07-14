import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const AppStoryMainPanelIntro = ({className, children, backgroundImage}) => {
	const classes = classnames('ptr-AppStoryMainPanelIntro', {}, className);

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

AppStoryMainPanelIntro.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	backgroundImage: PropTypes.string, //path to background image
};

export default AppStoryMainPanelIntro;
