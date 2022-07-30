import { AsyncPaginate } from 'react-select-async-paginate';
import React, { useState } from 'react';
import { GEO_API_URL, geoApiOptions } from '../../api';


const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        console.log(`input value: ${inputValue}`);
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            )
            .then(response => response.json())
            .then(response => {
                console.log(`geo api response: ${JSON.stringify(response)}`);
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return ( <
        AsyncPaginate placeholder = "Search for city"
        debounceTimeout = { 600 }
        value = { search }
        onChange = { handleOnChange }
        loadOptions = { loadOptions }
        />
    )
}

export default Search;