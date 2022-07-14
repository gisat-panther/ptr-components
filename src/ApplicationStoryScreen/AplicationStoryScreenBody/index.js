import {connect} from '@gisatcz/ptr-state';
import Action from '../../../state/Action';
import Select from '../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	const activeApplicationStoryKey = Select.router.getStory(state);

	return {
		activeApplicationStoryKey,
		activeScope:
			Select.cure.applicationStories.getActiveScopeByApplicationStoryKey(
				state,
				activeApplicationStoryKey
			),
	};
};

const mapDispatchToPropsFactory = () => {
	const componentId = `ApplicationStoryBody`;
	return dispatch => {
		return {
			onMount: storyKey => {
				dispatch(Action.cure.applicationStories.use(storyKey, componentId));
			},
			onStoryKeyChange: storyKey => {
				dispatch(Action.cure.applicationStories.use(storyKey, componentId));
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
