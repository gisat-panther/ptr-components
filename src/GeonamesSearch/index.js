import PropTypes from 'prop-types';
import classnames from 'classnames';
import {useState} from 'react';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {fetchGeonames} from './helpers';
import {geonamesApiKey, geonamesApiUrl} from './constants';

import './style.scss';

const SuggestionItem = ({name, description, info}) => {
	if (info) {
		return (
			<div className="ptr-GeonamesSearchSuggestionItem is-disabled">
				<div className="ptr-GeonamesSearchSuggestionItem-description">
					{description}
				</div>
			</div>
		);
	} else {
		return (
			<div className="ptr-GeonamesSearchSuggestionItem">
				<div className="ptr-GeonamesSearchSuggestionItem-name">{name}</div>
				<div className="ptr-GeonamesSearchSuggestionItem-description">
					{description}
				</div>
			</div>
		);
	}
};

SuggestionItem.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	info: PropTypes.string,
};

const GeonamesSearch = ({
	className,
	onPlaceSelect,
	apiKey = geonamesApiKey,
	apiUrl = geonamesApiUrl,
	autoFocus,
	maxPlaces = 5,
	hideClearIcon,
	hideSearchIcon,
	placeholder = 'Search place...',
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
				autoFocus={autoFocus}
				items={items}
				inputDebounce={50}
				onSearch={handleOnSearch}
				onSelect={handleOnSelect}
				placeholder={placeholder}
				formatResult={SuggestionItem}
				showClear={!hideClearIcon}
				showIcon={!hideSearchIcon}
			/>
		</div>
	);
};

GeonamesSearch.propTypes = {
	autoFocus: PropTypes.bool,
	className: PropTypes.string,
	apiKey: PropTypes.string,
	apiUrl: PropTypes.string,
	hideClearIcon: PropTypes.bool,
	hideSearchIcon: PropTypes.bool,
	maxPlaces: PropTypes.number,
	onPlaceSelect: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
};

export default GeonamesSearch;
