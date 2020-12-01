import { useState } from 'react';
import SelectSearch from '../src';
import '../style.css';
import classes from '../style.module.css';
import { countries, fontStacks, friends } from './data';

export default {
  title: 'Events',
};

export const OnChange = () => {
    const [size, setSize] = useState('s');
    const style = {
        fontFamily: '"Nunito Sans", sans-serif',
        marginTop: '24px',
    };

    if (size === 's') {
        style.fontSize = '16px';
    } else if (size === 'm') {
        style.fontSize = '32px';
    } if (size === 'l') {
        style.fontSize = '64px';
    }

    return (
        <>
            <SelectSearch
                value={size}
                onChange={setSize}
                placeholder="Select font size"
                options={[
                    { value: 's', name: 'Small' },
                    { value: 'm', name: 'Medium' },
                    { value: 'l', name: 'Large' },
                ]}
            />
            <h1 style={style}>Aa</h1>
        </>
    );
};

export const ControlledValue = () => {
    const [size, setSize] = useState(null);
    const style = {
        fontFamily: '"Nunito Sans", sans-serif',
        marginTop: '16px',
    };

    const button = {
        marginTop: '16px',
        display: 'inline-flex',
        position: 'relative',
        alignItems: 'center',
        height: '40px',
        padding: '0 16px',
        borderRadius: '3px',
        border: 'none',
        background: 'rgb(49, 173, 122)',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        outline: 'none',
    };

    const buttonTwo = {
        ...button,
        background: 'transparent',
        border: '2px solid #888',
        color: '#888',
        marginLeft: '8px',
    };

    return (
        <>
            <SelectSearch
                onChange={setSize}
                value={size}
                placeholder="Select size"
                options={[
                    { value: 'small', name: 'Small' },
                    { value: 'medium', name: 'Medium' },
                    { value: 'large', name: 'Large' },
                ]}
            />
            <p style={style}>You have selected: {size}</p>
            <button type="button" style={button} onClick={() => setSize(null)}>Click to reset</button>
            <button type="button" style={buttonTwo} onClick={() => setSize('medium')}>Set medium</button>
        </>
    );
};
