import { useState, useEffect } from 'react';
import SelectSearch from '../src';
import '../style.css';
import { countries, fontStacks } from './data';

export default {
  title: 'Async',
};

export const Fetch = () => (
    <SelectSearch
        options={[]}
        getOptions={(query) => {
            return new Promise((resolve, reject) => {
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
                    .then(response => response.json())
                    .then(({ drinks }) => {
                        resolve(drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink })))
                    })
                    .catch(reject);
            });
        }}
        search
        placeholder="Your favorite drink"
    />
);

export const FetchMultiple = () => (
    <SelectSearch
        options={[]}
        multiple
        getOptions={(query) => {
            return new Promise((resolve, reject) => {
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
                    .then(response => response.json())
                    .then(({ drinks }) => {
                        resolve(drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink })))
                    })
                    .catch(reject);
            });
        }}
        search
        placeholder="Your favorite drink"
    />
);

export const ControlledFetch = () => {
    const [options, setOptions] = useState([])
    const [value, setValue] = useState()
    const [valueOption, setValueOption] = useState()
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(({ drinks }) => {
                const newOptions = drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink }))
                if (valueOption) newOptions.unshift(valueOption)
                setOptions(newOptions)
            })
            .catch((e) => console.error(e));
    }, [query])

    return(
        <SelectSearch
            options={options}
            value={value}
            onChange={(value) => {
                setValue(value)
                setValueOption(options.find((o) => value === o.value))
            }}
            getOptions={(query) => {
                setQuery(query)
            }}
            search
            placeholder="Your favorite drink"
        />
    )
};

export const ControlledFetchMultiple = () => {
    const [options, setOptions] = useState([])
    const [value, setValue] = useState([])
    const [valueOptions, setValueOptions] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(({ drinks }) => {
                setOptions([...valueOptions, ...drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink }))])
            })
            .catch((e) => console.error(e));
    }, [query])

    return(
        <SelectSearch
            options={options}
            value={value}
            onChange={(value) => {
                setValue(value)
                setValueOptions(options.filter((o) => value.includes(o.value)))
            }}
            multiple
            getOptions={(query) => {
                setQuery(query)
            }}
            search
            placeholder="Your favorite drink"
        />
    )
};