import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		isReady: !!Select.app.getCompleteConfiguration(state),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
