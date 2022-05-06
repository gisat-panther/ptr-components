import {map as mapUtils} from '@gisatcz/ptr-utils';

/**
 * Prepare places
 * @param geonames {Array}
 * @returns {Array}
 */
const preparePlaces = geonames => {
	return geonames.map(item => {
		const {
			toponymName,
			countryName,
			adminName1,
			geonameId,
			name,
			bbox,
			lat,
			lng,
		} = item;

		let description = `${toponymName}`;
		let details = [];

		if (countryName) {
			details.push(countryName);
		}

		if (adminName1) {
			details.push(adminName1);
		}

		if (details.length) {
			description = `${description} (${details.join(', ')})`;
		}

		const pantherMapView = mapUtils.view.getViewFromBoundingBox(
			{
				minLat: bbox?.south || Number(lat) - 0.001,
				minLon: bbox?.east || Number(lng) - 0.001,
				maxLat: bbox?.north || Number(lat) + 0.001,
				maxLon: bbox?.west || Number(lng) + 0.001,
			},
			true
		);

		return {
			id: geonameId,
			name,
			description,
			bbox,
			lat,
			lon: lng,
			pantherMapView,
			originalData: item,
		};
	});
};

/**
 * Fetch places from gazetteer
 * @param apiUrl {string} service url
 * @param apiKey {string} api authorization key
 * @param searchString {string} string to search
 * @param maxItems {number} max number of items to be returned
 * @param handleItems {function} callback taking founded places as first argument
 */
export const fetchGeonames = (
	apiUrl,
	apiKey,
	searchString,
	maxItems,
	handleItems
) => {
	fetch(
		`${apiUrl}?q=${searchString}&fuzzy=0.7&maxRows=${maxItems}&inclBbox=true&username=${apiKey}`
	)
		.then(res => res.json())
		.then(
			result => {
				if (result?.geonames) {
					handleItems(preparePlaces(result.geonames));
				} else {
					console.warn('No geonames found');
				}
			},
			error => {
				throw new Error(error);
			}
		);
};
