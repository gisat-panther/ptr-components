import classnames from 'classnames';
import PropTypes from 'prop-types';
import {useRef} from 'react';

import './style.scss';

const AppStorySidePanel = ({
	className,
	children,
	onScroll,
	setSidePanelRef,
}) => {
	const classes = classnames('ptr-AppStorySidePanel', {}, className);
	const sidePanelRef = useRef();

	return (
		<div
			className={classes}
			ref={sidePanelRef}
			onScroll={scroll => {
				onScroll(scroll);
			}}
			onLoad={() => setSidePanelRef(sidePanelRef)}
		>
			{children}
		</div>
	);
};

AppStorySidePanel.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	onScroll: PropTypes.func,
	setSidePanelRef: PropTypes.func,
};

export default AppStorySidePanel;
