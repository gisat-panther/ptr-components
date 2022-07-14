import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Children, cloneElement, useState} from 'react';
import './style.scss';

const AppStoryBody = ({className, children}) => {
	const [activeSection, setActiveSection] = useState(0);
	const [jumpSection, setJumpSection] = useState(null);
	const [sidePanelRef, setSidePanelRef] = useState(undefined);
	const classes = classnames('ptr-AppStoryBody', {}, className);

	const onScroll = event => {
		let sidePanelNodes = Array.from(sidePanelRef.current.childNodes);
		sidePanelNodes.splice(-1);
		sidePanelNodes.forEach((node, index) => {
			node.offsetTop - 100 <= event.target.scrollTop &&
			node.offsetTop + node.offsetHeight - 100 > event.target.scrollTop
				? jumpSection == null
					? setActiveSection(index)
					: (setActiveSection(jumpSection),
					  sidePanelNodes[jumpSection].offsetTop == event.target.scrollTop
							? setJumpSection(null)
							: null)
				: null;
		});
	};

	return (
		<div className={classes}>
			{Children.map(children, child =>
				child.type.name == 'AppStorySidePanel'
					? cloneElement(child, {
							onScroll,
							setSidePanelRef,
					  })
					: sidePanelRef !== undefined
					? cloneElement(child, {
							activeSection,
							setJumpSection,
							sidePanelRef,
					  })
					: null
			)}
		</div>
	);
};

AppStoryBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default AppStoryBody;
