import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.scss';
import Screen from './components/Screen';

const RETRACTED_WIDTH = 5;
const CONST_PLUS = 1;

const Screens = ({
	children,
	set,
	screens,
	onCloseScreen,
	onFocusScreen,
	onOpenScreen,
	onRetractScreen,
	baseActiveWidth = 40,
}) => {
	const [widthState, setWidthState] = useState();

	const el = useRef();

	const resize = () => {
		let remSize = null;
		let pxWidth = null;
		//todo devicePixelRatio?

		// get available width
		if (el.current && typeof el.current.clientWidth !== 'undefined') {
			pxWidth = el.current.clientWidth;
		}

		// get current base font size (rem)
		if (document && document.documentElement) {
			remSize = getComputedStyle(document.documentElement).fontSize;
			remSize = Number(remSize.slice(0, -2)); // "16px" -> 16
		}

		// update available width in rem (if needed)
		if (pxWidth && remSize) {
			let width = pxWidth / remSize;
			if (width !== widthState) {
				setWidthState(width);
			}
		}
	};

	useEffect(() => {
		resize();
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', resize, {passive: true}); //todo IE
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', resize); //todo IE
			}
		};
	}, []);

	const renderScreen = (screen, content, noControls) => {
		return (
			<Screen
				key={screen.lineage}
				lineage={screen.lineage}
				focused={screen.focused}
				disabled={screen.computedDisabled}
				width={screen.computedWidth}
				minWidth={screen.minActiveWidth}
				content={content}
				contentWidth={screen.contentWidth}
				onFocus={onFocusScreen}
				onCloseClick={onCloseScreen}
				onOpenClick={onOpenScreen}
				onRetractClick={onRetractScreen}
				noControls={noControls}
			/>
		);
	};

	const renderScreens = () => {
		if (widthState && set) {
			let screensLocal = {};
			let orderByHistory = [set.orderByHistory].reverse();
			let orderBySpace = [...set.orderBySpace];

			// add any possible children as first screen
			if (children) {
				if (!_.includes(orderByHistory, 'base')) {
					orderByHistory.push('base');
				}
				if (!_.includes(orderBySpace, 'base')) {
					orderBySpace.unshift('base');
				}
			}

			// compute open screens
			let overallRetractedWidth = orderByHistory.length * RETRACTED_WIDTH;
			let availableWidthLeft = widthState - overallRetractedWidth;

			// check if there is enough space for first open screen
			let maximalizedScreenLineage = null;
			let baseFirstOpen = false;
			let otherFirstOpen = false;
			orderByHistory.forEach(lineage => {
				screensLocal[lineage] = {lineage};
				let stateScreen = screens[lineage];

				if (!maximalizedScreenLineage && !baseFirstOpen && !otherFirstOpen) {
					if (
						stateScreen &&
						stateScreen.data &&
						stateScreen.data.desiredState === 'open'
					) {
						// screen does not fit
						if (
							stateScreen.data.width + CONST_PLUS >
							availableWidthLeft + RETRACTED_WIDTH
						) {
							maximalizedScreenLineage = stateScreen.lineage;
						} else {
							otherFirstOpen = true;
						}
					}

					if (lineage === 'base') {
						baseFirstOpen = true;
					}
				}

				if (
					stateScreen &&
					stateScreen.data &&
					stateScreen.data.desiredState === 'closing'
				) {
					availableWidthLeft += RETRACTED_WIDTH;
				}
			});

			if (!maximalizedScreenLineage) {
				let focusedScreenAlreadySelected = false;
				orderByHistory.forEach(lineage => {
					let stateScreen = screens[lineage];
					if (!availableWidthLeft) {
						screensLocal[lineage].computedWidth = RETRACTED_WIDTH;
						screensLocal[lineage].computedDisabled = true;
					} else {
						if (stateScreen && stateScreen.data && stateScreen.data.width) {
							if (stateScreen.data.desiredState === 'open') {
								if (
									stateScreen.data.width + CONST_PLUS <=
									availableWidthLeft + RETRACTED_WIDTH
								) {
									screensLocal[lineage].computedWidth =
										stateScreen.data.width + CONST_PLUS;
								} else {
									screensLocal[lineage].computedWidth =
										availableWidthLeft + RETRACTED_WIDTH;
									screensLocal[lineage].computedDisabled = true;
								}
								availableWidthLeft -=
									screensLocal[lineage].computedWidth - RETRACTED_WIDTH;
							} else if (stateScreen.data.desiredState === 'retracted') {
								screensLocal[lineage].computedWidth = RETRACTED_WIDTH;
								screensLocal[lineage].computedDisabled = true;
							} else if (stateScreen.data.desiredState === 'opening') {
								screensLocal[lineage].computedWidth = 0;
								screensLocal[lineage].computedDisabled = false;
								availableWidthLeft -= stateScreen.data.width - RETRACTED_WIDTH;
							} else {
								screensLocal[lineage].computedWidth = 0;
								screensLocal[lineage].computedDisabled = true;
							}
						} else {
							if (
								stateScreen &&
								stateScreen.data &&
								stateScreen.data.desiredState === 'retracted'
							) {
								screensLocal[lineage].computedWidth = RETRACTED_WIDTH;
								screensLocal[lineage].computedDisabled = true;
							} else if (
								stateScreen &&
								stateScreen.data &&
								stateScreen.data.desiredState === 'closing'
							) {
								screensLocal[lineage].computedWidth = 0;
								screensLocal[lineage].computedDisabled = true;
							} else {
								let enoughSpaceAvailable =
									baseActiveWidth + CONST_PLUS <=
									availableWidthLeft + RETRACTED_WIDTH;
								if (
									lineage === 'base' &&
									(baseFirstOpen || enoughSpaceAvailable)
								) {
									screensLocal[lineage].computedWidth =
										baseActiveWidth + CONST_PLUS;
									availableWidthLeft -= baseActiveWidth - RETRACTED_WIDTH;
								} else {
									screensLocal[lineage].computedWidth =
										availableWidthLeft + RETRACTED_WIDTH;
									availableWidthLeft = 0;
								}

								if (lineage === 'base' && !baseFirstOpen) {
									screensLocal[lineage].computedDisabled =
										screensLocal[lineage].computedWidth < baseActiveWidth;
								}
							}
						}
					}

					let closing =
						stateScreen && stateScreen.data.desiredState === 'closing';
					if (
						!focusedScreenAlreadySelected &&
						(closing || !screensLocal[lineage].computedDisabled)
					) {
						screensLocal[lineage].focused = true;
						focusedScreenAlreadySelected = true;
					}
				});
			} else {
				orderByHistory.forEach(lineage => {
					if (lineage !== maximalizedScreenLineage) {
						screensLocal[lineage].computedDisabled = true;
						screensLocal[lineage].computedWidth = 0;
					} else {
						screensLocal[lineage].computedWidth = widthState;
						screensLocal[lineage].focused = true;
						screensLocal[lineage].minActiveWidth = 0;
					}
				});
			}

			let screenComponents = [];
			orderBySpace.forEach(screenLineage => {
				let screen = screensLocal[screenLineage];

				let stateScreen = screens[screenLineage];
				if (
					stateScreen &&
					stateScreen.data &&
					(stateScreen.data.minActiveWidth || screen.minActiveWidth)
				) {
					// screen.minActiveWidth = screen.hasOwnProperty('minActiveWidth')
					screen.minActiveWidth = Object.hasOwn(screen, 'minActiveWidth')
						? screen.minActiveWidth
						: stateScreen.data.minActiveWidth;
				}
				if (stateScreen && stateScreen.data && stateScreen.data.width) {
					screen.contentWidth = stateScreen.data.width
						? stateScreen.data.width
						: null;
				}

				if (screenLineage === 'base') {
					let content = children;
					if (screen.computedDisabled) {
						content = React.cloneElement(children, {
							unfocusable: true,
						});
					}
					screenComponents.push(renderScreen(screen, content, true));
				} else {
					screenComponents.push(
						renderScreen(
							screen,
							React.createElement(
								stateScreen.data.component,
								{
									...stateScreen.data.props,
									unfocusable: screen.computedDisabled,
								},
								null
							)
						)
					);
				}
			});

			return screenComponents;
		} else if (children) {
			let screen = {
				lineage: 'base',
			};
			return renderScreen(screen, children, true);
		} else {
			return null;
		}
	};

	return (
		<div className="ptr-screens" ref={el}>
			{renderScreens()}
		</div>
	);
};

Screens.propTypes = {
	set: PropTypes.shape({
		orderBySpace: PropTypes.array,
		orderByHistory: PropTypes.array,
	}),
	screens: PropTypes.object,
	onCloseScreen: PropTypes.func,
	onFocusScreen: PropTypes.func,
	onOpenScreen: PropTypes.func,
	onRetractScreen: PropTypes.func,
	baseActiveWidth: PropTypes.number,
	children: PropTypes.node,
};

export default Screens;
