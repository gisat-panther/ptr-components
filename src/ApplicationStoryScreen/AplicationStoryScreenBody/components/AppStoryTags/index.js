import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		tags: Select.tags.getByKeys(state, ownProps.tagKeys),
	};
};

const mapDispatchToPropsFactory = () => {
	const componentId = `AppStoryTags_${utils.uuid()}`;
	return (dispatch, ownProps) => {
		return {
			onMount: () => {
				dispatch(Action.tags.useKeys(ownProps.tagKeys, componentId));
			},
			onUnmount: () => {},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
