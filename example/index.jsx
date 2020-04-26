import React from 'react';
import { render } from 'react-dom';
import { fontStacks, countries, friends } from './data';
import '../style.css';
import SelectSearch from '../src';

function renderFriend(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (
        <button {...props} className={className} type="button">
            <span><img alt="" style={imgStyle} width="32" height="32" src={option.photo} /><span>{option.name}</span></span>
        </button>
    );
}

function renderFontValue(valueProps, snapshot, className) {
    const { selectedOption } = snapshot;
    const style = {
        fontFamily: (selectedOption && 'stack' in selectedOption) ? selectedOption.stack : null,
    };

    return (
        <input {...valueProps} className={className} style={style} value={snapshot.displayValue} />
    );
}

function renderFontOption(props, { stack, name }, snapshot, className) {
    return (
        <button {...props} className={className} type="button">
            <span style={{ fontFamily: stack }}>{name}</span>
        </button>
    );
}

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    state = {
        disabled: false,
        font: 'Playfair Display',
        country: 'SE',
        friends: [],
    };

    clear = () => {
        this.setState({
            font: '',
            country: '',
            friends: [],
        });
    };

    disable = () => {
        this.setState({
            disabled: !this.state.disabled,
        });
    };

    updateFont = (value) => this.setState({ font: value });
    updateCountry = (value) => this.setState({ country: value });
    updateFriends = (value) => this.setState({ friends: value });

    render() {
        const text = (this.state.disabled) ? 'Enable' : 'Disable';
        console.log(this.state);

        return (
            <div>
                <div className="test-btns">
                    <button type="button" className="clear" onClick={this.clear}>Clear values</button>
                    <button type="button" className="clear" onClick={this.disable}>{text}</button>
                </div>
                <SelectSearch
                    ref={this.ref}
                    options={fontStacks}
                    value={this.state.font}
                    onChange={this.updateFont}
                    renderValue={renderFontValue}
                    renderOption={renderFontOption}
                    disabled={this.state.disabled}
                />
                <SelectSearch
                    value={this.state.country}
                    options={countries}
                    onChange={this.updateCountry}
                    placeholder="Your country"
                    search
                    disabled={this.state.disabled}
                />
                <SelectSearch
                    multiple
                    className="select-search-box select-search-box--friends select-search-box--multiple"
                    value={this.state.friends}
                    onChange={this.updateFriends}
                    options={friends}
                    placeholder="Search friends"
                    renderOption={renderFriend}
                    disabled={this.state.disabled}
                    search
                />
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('app'),
);
