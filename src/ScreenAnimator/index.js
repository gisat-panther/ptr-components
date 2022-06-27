import {Children, cloneElement, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './ScreenAnimator.scss';

const ScreenAnimator = ({activeScreenKey, children}) => {
	const [activeScreen, setActiveScreen] = useState(activeScreenKey || null);
	const [screenCount] = useState(Children.count(children));

	useEffect(() => {
		if (activeScreen !== activeScreenKey) {
			setActiveScreen(activeScreenKey);
		}
	}, [activeScreenKey]);

	const switchScreen = key => {
		setActiveScreen(key);
	};

	let activeScreenIndex = 0;
	let childrenElms = Children.map(children, (child, index) => {
		if (child.props.screenKey === activeScreen) {
			activeScreenIndex = index;
		}
		return (
			<div
				style={{
					width: 100 / screenCount + '%',
				}}
			>
				{cloneElement(child, {
					...child.props,
					switchScreen,
				})}
			</div>
		);
	});

	return (
		<div className="ptr-screen-viewport">
			<div
				className="ptr-screen-container"
				style={{
					width: 100 * screenCount + '%',
					left: -100 * activeScreenIndex + '%',
				}}
			>
				{childrenElms}
			</div>
		</div>
	);
};

ScreenAnimator.propTypes = {
	activeScreenKey: PropTypes.string,
	children: PropTypes.node,
};

export default ScreenAnimator;
