import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {fetchGeonames} from './helpers';
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
	onPlaceSelect,
	apiKey = 'pavel.vlach',
	apiUrl = 'http://api.geonames.org/searchJSON',
}) => {
	const [items, onItemsChange] = useState([]);

	const handleOnSearch = searchString => {
		fetchGeonames(apiUrl, apiKey, searchString, onItemsChange);
	};

	const handleOnSelect = item => {
		if (onPlaceSelect) {
			onPlaceSelect(item);
		}
	};

	return (
		<div className="ptr-GeonamesSearch">
			<ReactSearchAutocomplete
				items={items}
				inputDebounce={200}
				onSearch={handleOnSearch}
				onSelect={handleOnSelect}
				formatResult={SuggestionItem}
			/>
		</div>
	);
};

GeonamesSearch.propTypes = {
	apiKey: PropTypes.string,
	apiUrl: PropTypes.string,
	onPlaceSelect: PropTypes.func,
};

export default GeonamesSearch;
