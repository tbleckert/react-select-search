import React from 'react';
import { render } from 'react-dom';
import SelectSearch from '../src';
import '../style.css';

const fontStacks = [
    {
        type: 'group',
        name: 'Sans serif',
        items: [
            { name: 'Roboto', value: 'Roboto', 'data-stack': 'Roboto, sans-serif' },
        ],
    },
    {
        type: 'group',
        name: 'Serif',
        items: [
            { name: 'Playfair Display', value: 'Playfair Display', 'data-stack': '"Playfair Display", serif' },
        ],
    },
    {
        type: 'group',
        name: 'Cursive',
        items: [
            { name: 'Monoton', value: 'Monoton', 'data-stack': 'Monoton, cursive' },
            { name: 'Gloria Hallelujah', value: 'Gloria Hallelujah', 'data-stack': '"Gloria Hallelujah", cursive' },
        ],
    },
    {
        type: 'group',
        name: 'Monospace',
        items: [
            { name: 'VT323', value: 'VT323', 'data-stack': 'VT323, monospace' },
        ],
    },
];
// https://randomuser.me/
const friends = [
    { name: 'Annie Cruz', value: 'annie.cruz', photo: 'https://randomuser.me/api/portraits/women/60.jpg' },
    { name: 'Eli Shelton', value: 'eli.shelton', photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { name: 'Loretta Rogers', value: 'loretta.rogers', photo: 'https://randomuser.me/api/portraits/women/51.jpg' },
    { name: 'Lloyd Fisher', value: 'lloyd.fisher', photo: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { name: 'Tiffany Gonzales', value: 'tiffany.gonzales', photo: 'https://randomuser.me/api/portraits/women/71.jpg' },
];
/** https://gist.github.com/Keeguon/2310008 */
const countryOptions = require('./data/countries');

function renderFontValue(label, option) {
    if (!option) {
        return label;
    }

    return <span style={{ fontFamily: option['data-stack'] }}>{label}</span>;
}

function renderFontOption(option) {
    if (!('data-stack' in option)) {
        return option.name;
    }

    const style = {
        fontFamily: option['data-stack'],
    };

    return <span style={style}>{option.name}</span>;
}

function renderFriend(option) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (<span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
}

class App extends React.Component {
    state = {
        font: 'Playfair Display',
        country: 'SE',
        friends: '',
    };

    clear = () => {
        this.setState({
            font: '',
            country: '',
            friends: '',
        });
    };

    render() {
        return (
            <div>
                <button type="button" className="clear" onClick={this.clear}>Clear values</button>
                <SelectSearch
                    name="font"
                    value={this.state.font}
                    renderOption={renderFontOption}
                    search={false}
                    renderValue={renderFontValue}
                    options={fontStacks}
                    placeholder="Choose font"
                />
                <SelectSearch
                    name="country"
                    mode="input"
                    value={this.state.country}
                    options={countryOptions}
                    placeholder="Your country"
                />
                <SelectSearch
                    name="friends"
                    multiple
                    value={this.state.friends}
                    height={172}
                    options={friends}
                    placeholder="Search friends"
                    renderOption={renderFriend}
                />
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('app'),
);
