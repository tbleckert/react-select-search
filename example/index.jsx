import React from 'react';
import { render } from 'react-dom';
import { fontStacks, countries, friends } from './data';
import '../style.css';
import SelectSearch from '../src';

function renderFriend(props, option) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (
        <button {...props} type="button">
            <span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>
        </button>
    );
}

function renderFontValue(valueProps, ref, props) {
    const style = {
        fontFamily: (props && 'stack' in props) ? props.stack : null,
    };

    return (
        <input ref={ref} {...valueProps} style={style} />
    );
}

function renderFontOption(props, { name, stack }) {
    return (
        <button {...props} type="button">
            <span style={{ fontFamily: stack }}>{name}</span>
        </button>
    );
}

function delayOptions(options) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(options);
        }, 1000);
    });
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

    render() {
        return (
            <div>
                <div className="test-btns">
                    <button type="button" className="clear" onClick={this.clear}>Clear values</button>
                    <button type="button" className="clear" onClick={this.disable}>Disable/Enable</button>
                </div>
                <SelectSearch
                    key="fonts"
                    ref={this.ref}
                    options={fontStacks}
                    renderValue={renderFontValue}
                    renderOption={renderFontOption}
                />
                <SelectSearch
                    value={this.state.country}
                    options={countries}
                    onChange={value => this.setState({ country: value })}
                    placeholder="Your country"
                    search
                    disabled={this.state.disabled}
                    filterOptions={delayOptions}
                />
                <SelectSearch
                    name="friends"
                    multiple
                    search
                    defaultValue={this.state.friends}
                    options={friends}
                    placeholder="Search friends"
                    renderOption={renderFriend}
                    filterOptions={options => options}
                    autoFocus
                />
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('app'),
);
