import PropTypes from 'prop-types';
import {useEffect} from 'react';
import App1_SurfaceDynamics from '../../stories/App1_SurfaceDynamics';
import App2_UrbanHeatIslandEffect from '../../stories/App2_UrbanHeatIslandEffect';
import App3_UrbanHeatEmissions from '../../stories/App3_UrbanHeatEmissions';
import App4_UrbanCO2Emissions from '../../stories/App4_UrbanCO2Emissions';
import App5_UrbanFloodRisk from '../../stories/App5_UrbanFloodRisk';
import App6_UrbanSubsidence from '../../stories/App6_UrbanSubsidence';
import App7_UrbanAirQuality from '../../stories/App7_UrbanAirQuality';
import App8_UrbanThermalComfort from '../../stories/App8_UrbanThermalComfort';
import App9_UrbanHeatStorage from '../../stories/App9_UrbanHeatStorage';
import App10_NatureBasedSolutions from '../../stories/App10_NatureBasedSolutions';
import App11_HealthImpact from '../../stories/App11_HealthImpact';
import './style.scss';

const getStoryComponent = key => {
	switch (key) {
		case 'ap01-surface-dynamics':
			return <App1_SurfaceDynamics />;
		case 'ap02-urban-heat-island':
			return <App2_UrbanHeatIslandEffect />;
		case 'ap03-urban-heat-emissions':
			return <App3_UrbanHeatEmissions />;
		case 'ap04-urban-co2-emissions':
			return <App4_UrbanCO2Emissions />;
		case 'ap05-urban-flood-risk':
			return <App5_UrbanFloodRisk />;
		case 'ap06-urban-subsidence':
			return <App6_UrbanSubsidence />;
		case 'ap07-urban-air-quality':
			return <App7_UrbanAirQuality />;
		case 'ap08-urban-thermal-comfort':
			return <App8_UrbanThermalComfort />;
		case 'ap09-urban-heat-storage':
			return <App9_UrbanHeatStorage />;
		case 'ap10-nature-based-solutions':
			return <App10_NatureBasedSolutions />;
		case 'ap11-health-impact':
			return <App11_HealthImpact />;
		default:
			return <div>No story found</div>;
	}
};

const ApplicationStoryScreenBody = ({
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
				{activeScope ? getStoryComponent(activeApplicationStoryKey) : null}
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
};

export default ApplicationStoryScreenBody;
