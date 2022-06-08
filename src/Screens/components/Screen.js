import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Button} from '@gisatcz/ptr-atoms';

const Screen = ({
	content,
	disabled,
	focused,
	onFocus,
	onCloseClick,
	onOpenClick,
	onRetractClick,
	noControls,
	lineage,
	minWidth,
	width,
}) => {
	const screen = useRef();
	const [focusedState, setFocused] = useState(false);

	const onFocusSelf = () => {
		if (!disabled) {
			onFocus(lineage);
			setFocused(true);
		}
	};

	const onBlur = () => {
		setFocused(false);
	};

	useEffect(() => {
		if (disabled !== true && screen?.current?.children[0]) {
			screen.current.children[0].focus();
		}
	}, []);

	const focusRef = useRef();

	useEffect(() => {
		if (
			focused &&
			focusRef.current !== focused &&
			!disabled &&
			screen?.current?.children[0]
		) {
			screen.current.children[0].focus();
		}
		focusRef.current = focused;

		if (disabled) {
			setFocused(false);
		}
	}, [focused, disabled]);

	let tabIndex = disabled ? -1 : 0;
	let classes = classNames('ptr-screen', {
		base: lineage === 'base',
		disabled: disabled,
		open: !disabled,
		focused: focusedState,
	});

	let screenStyle = {};
	if (width || width === 0) {
		screenStyle.width = `${width}rem`;
	}

	let screenScrollStyle = {};
	if (disabled) {
		screenScrollStyle.overflow = `hidden`;
	}

	let screenScrollContentStyle = {};
	if (minWidth || minWidth === 0) {
		screenScrollContentStyle.minWidth = `${minWidth}rem`;
	}

	return (
		<div
			className={classes}
			style={screenStyle}
			onFocus={onFocusSelf}
			onBlur={onBlur}
			ref={screen}
		>
			<div
				className="ptr-screen-scroll"
				style={screenScrollStyle}
				tabIndex={tabIndex}
			>
				<div style={screenScrollContentStyle}>{content}</div>
			</div>
			<div className="ptr-screen-overlay" onClick={onOpenClick} />
			{!noControls ? (
				<div className="ptr-screen-controls top">
					<Button
						ghost
						icon={'close'}
						side={'left'}
						unfocusable={disabled}
						onClick={onCloseClick}
					/>
				</div>
			) : null}
			{!noControls && disabled ? (
				<div className="ptr-screen-controls middle">
					<Button
						ghost
						icon={'chevron-left'}
						side={'left'}
						unfocusable={disabled}
						onClick={onOpenClick}
					/>
				</div>
			) : null}
			{!noControls && !disabled ? (
				<div className="ptr-screen-controls middle">
					<Button
						ghost
						icon={'chevron-right'}
						side={'left'}
						unfocusable={disabled}
						onClick={onRetractClick}
					/>
				</div>
			) : null}
		</div>
	);
};

Screen.propTypes = {
	content: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	onFocus: PropTypes.func,
	onCloseClick: PropTypes.func,
	onOpenClick: PropTypes.func,
	onRetractClick: PropTypes.func,
	noControls: PropTypes.bool,
	lineage: PropTypes.string,
	minWidth: PropTypes.number,
	width: PropTypes.number,
};

export default Screen;
