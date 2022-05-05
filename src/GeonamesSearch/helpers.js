export const fetchGeonames = (apiUrl, apiKey, searchString, handleItems) => {
	fetch(
		`${apiUrl}?q=${searchString}&fuzzy=0.7&maxRows=10&inclBbox=true&username=${apiKey}`
	)
		.then(res => res.json())
		.then(
			result => {
				if (result.geonames) {
					const items = result.geonames.map(item => {
						const {
							toponymName,
							countryName,
							adminName1,
							geonameId,
							name,
							bbox,
							lat,
							lon,
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

						return {
							id: geonameId,
							name,
							description,
							bbox,
							lat,
							lon,
						};
					});
					handleItems(items);
				}
			},
			error => {
				throw new Error(error);
			}
		);
};
