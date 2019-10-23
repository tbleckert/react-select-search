import React from 'react';
import { render } from 'react-dom';
import { fontStacks, countries, friends } from './data';
import '../style.css';
import SelectSearch from '../src';

function renderFriend(option) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (<span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
}

class App extends React.PureComponent {
    state = {
        font: 'Playfair Display',
        country: 'SE',
        friends: [],
    };

    clear = () => {
        this.setState({
            font: '',
            country: '',
            friends: [],
            colors: [],
        });
    };

    render() {
        return (
            <div>
                <SelectSearch
                    value={this.state.font}
                    options={fontStacks}
                    renderValue={(valueProps, ref, props) => {
                        console.log(valueProps, props);
                        return (
                            <input ref={ref} {...valueProps} style={{ fontFamily: props.stack }} />
                        );
                    }}
                    renderOption={({ name, stack }) => (
                        <span style={{ fontFamily: stack }}>{name}</span>
                    )}
                />
                <SelectSearch
                    value={this.state.country}
                    options={countries}
                    placeholder="Your country"
                    search
                />
                <SelectSearch
                    name="friends"
                    multiple
                    search
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
