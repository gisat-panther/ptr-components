import AppStoryNavPanelTopMargin from './AppStoryNavPanelTopMargin';
import AppStoryNavPanelContainer from './AppStoryNavPanelContainer';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const AppStoryNavPanel = ({
	className,
	activeSection,
	setJumpSection,
	sidePanelRef,
}) => {
	const classes = classnames('ptr-AppStoryNavPanel', {}, className);
	const jumpSection = section => {
		setJumpSection(section);
	};

	return (
		<div className={classes}>
			<AppStoryNavPanelTopMargin className={''} />
			<AppStoryNavPanelContainer
				className={''}
				activeSection={activeSection}
				jumpSection={jumpSection}
				sidePanelRef={sidePanelRef}
			/>
		</div>
	);
};

AppStoryNavPanel.propTypes = {
	className: PropTypes.string,
	activeSection: PropTypes.number,
	setJumpSection: PropTypes.func,
	sidePanelRef: PropTypes.object,
};

export default AppStoryNavPanel;
