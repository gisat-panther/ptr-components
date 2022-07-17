import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const AppStoryMainPanel = ({
	className,
	children,
	activeSection,
	sidePanelRef,
}) => {
	const classes = classnames('ptr-AppStoryMainPanel', {}, className);
	let newChildren = children;
	let sidePanelNodes = Array.from(sidePanelRef.current.childNodes);
	sidePanelNodes.length !== children.length
		? // The number of showcases in the main panel is different from the number of showcases in side panel
		  ((newChildren = []),
		  sidePanelNodes.forEach((node, index) => {
				index !== sidePanelNodes.length - 1
					? newChildren.push(children[0])
					: newChildren.push(children[children.length - 1]);
		  }))
		: null;
	return <div className={classes}>{newChildren[activeSection]}</div>;
};

AppStoryMainPanel.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	activeSection: PropTypes.number,
	sidePanelRef: PropTypes.object,
};

export default AppStoryMainPanel;
