import React from 'react';
import { render } from 'react-dom';
import Select from '../src';
import { fontStacks, countries } from './data';
import '../style.css';

class App extends React.PureComponent {
    state = {
        font: 'Playfair Display',
        country: 'SE',
        friends: [],
        colors: ['red', 'purple'],
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
                <Select
                    value={this.state.font}
                    options={fontStacks}
                    renderValue={(label, { stack }) => (
                        <span style={{ fontFamily: stack }}>{label}</span>
                    )}
                    renderOption={({ name, stack }) => (
                        <span style={{ fontFamily: stack }}>{name}</span>
                    )}
                />
                <Select
                    value={this.state.country}
                    options={countries}
                    placeholder="Your country"
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
