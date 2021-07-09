import SelectSearch, { fuzzySearch } from '../src';
import '../style.css';
import { countries } from './data';

export default {
    title: 'Single select',
    component: SelectSearch,
    argTypes: {
        multiple: { control: { type: 'boolean' } },
        search: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },
        closeOnSelect: { control: { type: 'boolean' } },
        placeholder: { control: { type: 'text' } },
        onFocus: {
            action: 'focus',
        },
        onBlur: {
            action: 'blur',
        },
        onChange: {
            action: 'change',
        },
        printOptions: {
            control: {
                type: 'radio',
                options: ['auto', 'always', 'never', 'on-focus'],
            },
        },
    },
};

const Template = (args) => <SelectSearch {...args} />;

export const Default = Template.bind({});

Default.args = {
    id: 'test-id',
    multiple: false,
    search: false,
    disabled: false,
    closeOnSelect: true,
    printOptions: 'auto',
    placeholder: null,
    options: [
        { value: 's', name: 'Small', disabled: true },
        { value: 'm', name: 'Medium' },
        { value: 'l', name: 'Large' },
    ],
};

Default.argTypes = {
    multiple: { control: { type: 'boolean' } },
};

export const withPlaceholder = () => (
    <SelectSearch
        options={[
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ]}
        placeholder="Choose a size"
    />
);

export const Search = () => (
    <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        placeholder="Select your country"
    />
);

export const SearchWithEmptyMessage = () => (
    <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Not found"
        placeholder="Select your country"
    />
);

export const SearchWithEmptyMessageRenderer = () => (
    <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
        placeholder="Select your country"
    />
);

export const LimitedOptions = () => (
    <SelectSearch
        options={countries}
        search
        placeholder="Select your country"
        filterOptions={(options) => {
            const filter = fuzzySearch(options);

            return (q) => filter(q).slice(0, 8);
        }}
    />
);

export const AlwaysOpen = () => (
    <SelectSearch
        options={[
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ]}
        printOptions="always"
    />
);

export const StayOnSelect = () => (
    <SelectSearch
        closeOnSelect={false}
        options={[
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ]}
    />
);

export const Group = () => (
    <SelectSearch
        printOptions="always"
        options={[
            {
                name: 'Food',
                type: 'group',
                items: [{
                    value: 'hamburger',
                    name: 'Hamburger',
                }, {
                    value: 'pizza',
                    name: 'Pizza',
                }]
            },
            {
                name: 'Drinks',
                type: 'group',
                items: [{
                    value: 'soft',
                    name: 'Soft drink',
                }, {
                    value: 'beer',
                    name: 'Beer',
                }]
            }
        ]}
    />
);
