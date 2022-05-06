import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, {useState} from 'react';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {fetchGeonames} from './helpers';
import {geonamesApiKey, geonamesApiUrl} from './constants';

import './style.scss';

const SuggestionItem = ({name, description}) => {
	return (
		<div className="ptr-GeonamesSearchSuggestionItem">
			<div className="ptr-GeonamesSearchSuggestionItem-name">{name}</div>
			<div className="ptr-GeonamesSearchSuggestionItem-description">
				{description}
			</div>
		</div>
	);
};

const GeonamesSearch = ({
	className,
	onPlaceSelect,
	apiKey = geonamesApiKey,
	apiUrl = geonamesApiUrl,
	maxPlaces = 5,
}) => {
	const [items, onItemsChange] = useState([]);

	const handleOnSearch = searchString => {
		fetchGeonames(apiUrl, apiKey, searchString, maxPlaces, onItemsChange);
	};

	const handleOnSelect = item => {
		if (onPlaceSelect) {
			onPlaceSelect(item);
		}
	};

	const classes = classnames('ptr-GeonamesSearch', {}, className);

	return (
		<div className={classes}>
			<ReactSearchAutocomplete
				items={items}
				inputDebounce={50}
				onSearch={handleOnSearch}
				onSelect={handleOnSelect}
				formatResult={SuggestionItem}
			/>
		</div>
	);
};

GeonamesSearch.propTypes = {
	className: PropTypes.string,
	apiKey: PropTypes.string,
	apiUrl: PropTypes.string,
	maxPlaces: PropTypes.number,
	onPlaceSelect: PropTypes.func.isRequired,
};

export default GeonamesSearch;
