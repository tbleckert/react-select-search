import React from 'react';
import { render } from 'react-dom';
import SelectSearch from '../src';
import '../style.css';
import { countries, fontStacks, friends_search } from './data';

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
        friends_search: [],
        friends: ['maria.waters', 'lorena.mccoy']
    };

    clear = () => {
        this.setState({
            font: '',
            country: '',
            friends_search: [],
            friends: []
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
                    options={countries}
                    placeholder="Your country"
                />
                <SelectSearch
                    name="friends"
                    multiple
                    value={this.state.friends_search}
                    height={172}
                    options={friends_search}
                    placeholder="Search friends"
                    renderOption={renderFriend}
                />
                <SelectSearch
                    name="friends"
                    multiple
                    search={false}
                    value={this.state.friends}
                    height={172}
                    options={friends_search.slice().reverse()}
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
