import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Rnd} from 'react-rnd';
import _ from 'lodash';

import {Icon} from '@gisatcz/ptr-atoms';

// TODO handle sizes in rem
const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;
const MAX_WIDTH = 'auto';
const MAX_HEIGHT = 'auto';

const Window = ({
	containerHeight,
	containerWidth,
	content,
	icon,
	onDragStart,
	onDragStop,
	onClick,
	onCloseClick,
	onResize,
	title,
	windowKey,
	withoutHeader,
	height,
	width,
	minHeight,
	minWidth,
	maxHeight,
	maxWidth,
}) => {
	const onClickSelf = () => {
		if (onClick) {
			onClick(windowKey);
		}
	};

	const onCloseSelf = e => {
		e.stopPropagation();
		if (onCloseClick) {
			onCloseClick(windowKey);
		}
	};

	const onDragStartSelf = () => {
		if (onDragStart) {
			onDragStart(windowKey);
		}
	};

	const calculatePositionFromXY = (x, y, width, height) => {
		const topDiff = y;
		const bottomDiff = containerHeight - (y + height);
		const leftDiff = x;
		const rightDiff = containerWidth - (x + width);

		const position = {top: null, bottom: null, left: null, right: null};

		if (topDiff > bottomDiff && bottomDiff > 0) {
			position.bottom = bottomDiff;
		} else {
			position.top = topDiff;
		}

		if (leftDiff > rightDiff && rightDiff > 0) {
			position.right = rightDiff;
		} else {
			position.left = leftDiff;
		}

		return position;
	};

	const onDragStopSelf = (e, data) => {
		let position = calculatePositionFromXY(data.x, data.y, width, height);

		// TODO find better way
		let isTargetCloseButton =
			e.target.className && e.target.className === 'ptr-window-control close';
		let isParentCloseButton = _.find(e.path, element => {
			return element.className === 'ptr-window-control close';
		});

		if (isTargetCloseButton || isParentCloseButton) {
			onCloseSelf(e);
		} else if (onDragStop) {
			onDragStop(windowKey, position);
		}
	};

	const onResizeSelf = (e, direction, ref, delta, coord) => {
		if (onResize) {
			let position = calculatePositionFromXY(
				coord.x,
				coord.y,
				ref.offsetWidth,
				ref.offsetHeight
			);
			// console.log(position, ref.offsetWidth, ref.offsetHeight , direction, delta);
			onResize(windowKey, ref.offsetWidth, ref.offsetHeight, position); // TODO check
		}
	};

	const renderControls = fixed => {
		let classes = classNames('ptr-window-controls', {
			fixed: fixed,
		});

		return (
			<div className={classes}>
				<div className="ptr-window-control close" onClick={onCloseSelf}>
					<Icon icon="close" />
				</div>
			</div>
		);
	};

	const renderHeader = handleClass => {
		let headerClasses = 'ptr-window-header ' + handleClass;

		return (
			<div className={headerClasses}>
				<div className="ptr-window-title" title={title}>
					{icon ? <Icon icon={icon} /> : null}
					{title}
				</div>
				{renderControls()}
			</div>
		);
	};

	const renderContent = () => {
		return <div className="ptr-window-content">{content}</div>;
	};

	const calculateXYfromPosition = (width, height) => {
		const top = position.top;
		const bottom = position.bottom;
		const left = position.left;
		const right = position.right;

		let x = 0;
		let y = 0;

		if (top || top === 0) {
			if (top + height < containerHeight) {
				y = top;
			} else {
				y = containerHeight - height;
			}
		} else {
			if (bottom + height < containerHeight) {
				y = containerHeight - (bottom + height);
			} else {
				y = 0;
			}
		}

		if (left || left === 0) {
			if (left + width < containerWidth) {
				x = left;
			} else {
				x = containerWidth - width;
			}
		} else {
			if (right + width < containerWidth) {
				x = containerWidth - (right + width);
			} else {
				x = 0;
			}
		}

		return {x, y};
	};

	const handleClass = 'ptr-window-handle';

	let classes = classNames('ptr-window', {
		[handleClass]: !!withoutHeader,
	});

	let renderWidth = width ? width : 'auto';
	let renderHeight = height ? height : 'auto';

	if (renderWidth > containerWidth && containerWidth) {
		renderWidth = containerWidth;
	}

	if (renderHeight > containerHeight && containerHeight) {
		renderHeight = containerHeight;
	}

	let position = calculateXYfromPosition(renderWidth, renderHeight);

	return (
		<Rnd
			bounds="parent"
			className={classes}
			dragHandleClassName={handleClass}
			minWidth={minWidth ? minWidth : MIN_WIDTH}
			minHeight={minHeight ? minHeight : MIN_HEIGHT}
			maxWidth={maxWidth ? maxWidth : MAX_WIDTH}
			maxHeight={maxHeight ? maxHeight : MAX_HEIGHT}
			onDragStop={onDragStopSelf}
			onDragStart={onDragStartSelf}
			onClick={onClickSelf}
			onResize={onResizeSelf}
			position={{
				x: position.x,
				y: position.y,
			}}
			size={{renderWidth, renderHeight}}
		>
			{withoutHeader ? renderControls(true) : renderHeader(handleClass)}
			{renderContent()}
		</Rnd>
	);
};

Window.propTypes = {
	containerHeight: PropTypes.number,
	containerWidth: PropTypes.number,
	content: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	icon: PropTypes.string,
	onDragStart: PropTypes.func,
	onDragStop: PropTypes.func,
	onClick: PropTypes.func,
	onCloseClick: PropTypes.func,
	onResize: PropTypes.func,
	title: PropTypes.string,
	windowKey: PropTypes.string,
	withoutHeader: PropTypes.bool,
	height: PropTypes.number,
	width: PropTypes.number,
	minWidth: PropTypes.number,
	minHeight: PropTypes.number,
	maxWidth: PropTypes.number,
	maxHeight: PropTypes.number,
};

export default Window;
