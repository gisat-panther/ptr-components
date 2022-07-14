import PropTypes from 'prop-types';
import Link from '../../../common/Link';
import {getRouter} from '../../../../router';
import {Icon} from '@gisatcz/visat-components';
import './style.scss';

const ApplicationStoryNav = ({activeApplicationStory}) => {
	return (
		<nav className="cure-ApplicationStoryNav">
			<Link
				tabIndex={0}
				classes={'cure-ApplicationStoryNav-link'}
				name={'cure-applications'}
				router={getRouter()}
				paramsFilter={['key']} //which params will be forgoten
			>
				<Icon
					className="cure-ApplicationStoryNav-linkIcon"
					icon={'ri-applications'}
				/>
				<span className="cure-ApplicationStoryNav-linkTitle">
					CURE Applications
				</span>
			</Link>
			<span className="cure-ApplicationStoryNav-divider">/</span>
			<span className="cure-ApplicationStoryNav-title">
				{activeApplicationStory?.data?.nameDisplay}
			</span>
		</nav>
	);
};

ApplicationStoryNav.propTypes = {
	activeApplicationStory: PropTypes.object,
};

export default ApplicationStoryNav;
