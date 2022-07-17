import classnames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import './style.scss';

const AppStoryBody = ({
	className,
	children,
	activeApplicationStoryKey,
	activeScope,
	onMount,
	onUnmount,
	onStoryKeyChange,
}) => {
	const classes = classnames('ptr-AppStoryBody', {}, className);
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount(activeApplicationStoryKey);
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	useEffect(() => {
		if (onStoryKeyChange && typeof onStoryKeyChange === 'function') {
			onStoryKeyChange(activeApplicationStoryKey);
		}
	}, [activeApplicationStoryKey]);

	return <div className={classes}>{activeScope ? children : null}</div>;
};

AppStoryBody.propTypes = {
	className: PropTypes.string,
	activeApplicationStoryKey: PropTypes.string,
	activeScope: PropTypes.object,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	onStoryKeyChange: PropTypes.func,
	children: PropTypes.any,
};

export default AppStoryBody;
