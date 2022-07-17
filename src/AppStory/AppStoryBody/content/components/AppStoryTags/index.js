import classnames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {TagsContainer, Tag} from '@gisatcz/visat-components';

import './style.scss';

const AppStoryTags = ({className, tagKeys, tags, onMount, onUnmount}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount(tagKeys);
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	const classes = classnames('ptr-AppStoryTags ptr-light', {}, className);
	return (
		<TagsContainer className={classes}>
			{tags && tags.map(tag => <Tag key={tag.key}>{tag.data.nameDisplay}</Tag>)}
		</TagsContainer>
	);
};

AppStoryTags.propTypes = {
	className: PropTypes.string,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	tags: PropTypes.array,
	tagKeys: PropTypes.array,
};

export default AppStoryTags;
