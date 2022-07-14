import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	const activeApplicationStoryKey = Select.router.getStory(state);

	return {
		activeApplicationStory:
			Select.cure.applicationStories.getActiveScopeByApplicationStoryKey(
				state,
				activeApplicationStoryKey
			),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
