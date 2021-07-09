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
