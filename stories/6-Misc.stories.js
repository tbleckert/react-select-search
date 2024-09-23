import React from 'react';
import SelectSearch from '../src';
import '../style.css';
import { useEffect, useState } from "react";
import { colors } from "./data";

export default {
    title: 'Misc',
};

export const StateOptions = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(colors);
    }, []);

    return (
        <SelectSearch
            defaultValue={colors[1].value}
            options={options}
            multiple
        />
    );
};

export const NumericValues = () => (
    <SelectSearch
        defaultValue={0}
        options={[
            { value: 1, name: 'Second' },
            { value: 0, name: 'First' },
            { value: 'third', name: 'Third' },
        ]}
    />
);

export const Form = () => (
    <>
        <div style={{ marginBottom: '16px' }}>
            <SelectSearch
                printOptions="on-focus"
                multiple
                placeholder="Select your items"
                options={[
                    { value: 'hamburger', name: 'Hamburger' },
                    { value: 'fries', name: 'Fries' },
                    { value: 'milkshake', name: 'Milkshake' },
                ]}
            />
        </div>
        <SelectSearch
            options={[
                { value: 's', name: 'Small' },
                { value: 'm', name: 'Medium' },
                { value: 'l', name: 'Large' },
            ]}
        />
    </>
);
