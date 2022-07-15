import PropTypes from 'prop-types';
import {useEffect} from 'react';
import './style.scss';

const ApplicationStoryScreenBody = ({
	children,
	activeApplicationStoryKey,
	activeScope,
	onMount,
	onUnmount,
	onStoryKeyChange,
}) => {
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

	return (
		<div className="cure-ApplicationStoryScreenBody">
			<div className="cure-ApplicationStoryScreenBody-content">
				{activeScope ? children : null}
			</div>
		</div>
	);
};

ApplicationStoryScreenBody.propTypes = {
	activeApplicationStoryKey: PropTypes.string,
	activeScope: PropTypes.object,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	onStoryKeyChange: PropTypes.func,
	children: PropTypes.any,
};

export default ApplicationStoryScreenBody;
