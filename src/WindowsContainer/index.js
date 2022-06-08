import {useRef, useState, createElement, cloneElement, useEffect} from 'react';
import PropTypes from 'prop-types';
import Window from './components/Window';

import './style.scss';

const WindowsContainer = ({
	onWindowClick,
	onWindowClose,
	onWindowDragStart,
	onWindowDragStop,
	onWindowResize,
	set,
	windows,
	children,
}) => {
	const [size, setSize] = useState({
		width: null,
		height: null,
	});

	const ref = useRef();

	const resize = () => {
		// TODO handle sizes in rem
		let pxWidth = null;
		let pxHeight = null;

		// get available width and height
		if (
			ref.current &&
			typeof ref.current.clientWidth !== 'undefined' &&
			typeof ref.current.clientHeight !== 'undefined'
		) {
			pxHeight = ref.current.clientHeight;
			pxWidth = ref.current.clientWidth;
		}

		if (pxWidth || pxHeight) {
			if (pxWidth !== size.width || pxHeight !== size.height) {
				setSize({width: pxWidth, height: pxHeight});
			}
		}
	};

	useEffect(() => {
		resize();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', resize, {passive: true}); //todo IE
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', resize);
			}
		};
	}, []);

	const onWindowClickSelf = windowKey => {
		onWindowClick(windowKey);
	};

	const onWindowCloseClick = windowKey => {
		onWindowClose(windowKey);
	};

	const onWindowDragStartSelf = windowKey => {
		onWindowDragStart(windowKey);
	};

	const onWindowDragStopSelf = (windowKey, position) => {
		onWindowDragStop(windowKey, position);
	};

	const onWindowResizeSelf = (windowKey, width, height, position) => {
		onWindowResize(windowKey, width, height, position);
	};

	const renderWindow = (key, index, settings, content) => {
		return (
			<Window
				key={key}
				containerHeight={size.height}
				containerWidth={size.width}
				content={content}
				onClick={onWindowClickSelf}
				onCloseClick={onWindowCloseClick}
				onDragStart={onWindowDragStartSelf}
				onDragStop={onWindowDragStopSelf}
				onResize={onWindowResizeSelf}
				windowKey={key}
				withoutTilte={!settings.title}
				zIndex={index}
				{...settings}
			/>
		);
	};

	const renderWindows = () => {
		if (set) {
			const order = set.orderByHistory;

			return order.map((windowKey, index) => {
				let window = windows[windowKey];

				if (
					window.data.component &&
					typeof window.data.component === 'function'
				) {
					return renderWindow(
						window.key,
						index,
						window.data.settings,
						createElement(window.data.component, {...window.data.props})
					);
				} else {
					return renderWindow(
						window.key,
						index,
						window.data.settings,
						cloneElement(window.data.component)
					);
				}
			});
		} else {
			return null;
		}
	};

	// TODO what if any child is Window component?
	return (
		<div className="ptr-windows-container" ref={ref}>
			{children}
			{renderWindows()}
		</div>
	);
};

WindowsContainer.propTypes = {
	onWindowClick: PropTypes.func,
	onWindowClose: PropTypes.func,
	onWindowDragStart: PropTypes.func,
	onWindowDragStop: PropTypes.func,
	onWindowResize: PropTypes.func,
	set: PropTypes.shape({
		orderByHistory: PropTypes.array,
	}),
	windows: PropTypes.object,
	children: PropTypes.node,
};

export default WindowsContainer;
