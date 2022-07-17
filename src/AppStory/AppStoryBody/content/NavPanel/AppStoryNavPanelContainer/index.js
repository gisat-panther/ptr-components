import classnames from 'classnames';
import PropTypes from 'prop-types';

import {IconTool} from '@gisatcz/visat-components';

import './style.scss';
import {useRef} from 'react';

const AppStoryNavPanelContainer = ({
	className,
	activeSection,
	jumpSection,
	sidePanelRef,
}) => {
	const navPanelCasesRef = useRef();
	const classes = classnames('ptr-AppStoryNavPanelContainer', {}, className);

	let sidePanelNodes = Array.from(sidePanelRef.current.childNodes);
	let navIconsArray = [];
	sidePanelNodes.forEach((node, index) => {
		navIconsArray.push(
			<IconTool
				key={index}
				className={
					activeSection == index
						? classnames('ptr-AppStoryNavPanelIcon', {}, 'is-active')
						: 'ptr-AppStoryNavPanelIcon'
				}
				icon={
					index == 0
						? 'ri-home'
						: index == sidePanelNodes.length - 1
						? 'ri-square'
						: 'ri-dot'
				}
				tooltip={{
					text: node.childNodes[0].innerText,
					position: 'right',
				}}
				onClick={e => scrollToSection(e, 'section')}
			/>
		);
	});

	const scrollToSection = (e, type) => {
		let navPanelCasesNodes = Array.from(navPanelCasesRef.current.childNodes);
		switch (type) {
			case 'section':
				return navPanelCasesNodes.forEach((node, index) => {
					node == e.currentTarget && activeSection !== index
						? (sidePanelNodes[index].scrollIntoView(), jumpSection(index))
						: null;
				});
			case 'up':
				return sidePanelNodes.forEach((node, index) => {
					node == sidePanelNodes[activeSection] && activeSection !== 0
						? sidePanelNodes[index - 1].scrollIntoView()
						: null;
				});
			case 'down':
				return sidePanelNodes.forEach((node, index) => {
					node == sidePanelNodes[activeSection] &&
					activeSection !== sidePanelNodes.length - 1
						? sidePanelNodes[index + 1].scrollIntoView()
						: null;
				});
			default:
				return null;
		}
	};

	return (
		<div className={classes}>
			<IconTool
				className="ptr-AppStoryNavPanelIcon"
				icon={'ri-chevron-up'}
				onClick={e => scrollToSection(e, 'up')}
			/>
			<div className="ptr-AppStoryNavPanelCases" ref={navPanelCasesRef}>
				{navIconsArray}
			</div>
			<IconTool
				className="ptr-AppStoryNavPanelIcon"
				icon={'ri-chevron-down'}
				onClick={e => scrollToSection(e, 'down')}
			/>
		</div>
	);
};

AppStoryNavPanelContainer.propTypes = {
	className: PropTypes.string,
	activeSection: PropTypes.number,
	jumpSection: PropTypes.func,
	sidePanelRef: PropTypes.object,
};

export default AppStoryNavPanelContainer;
