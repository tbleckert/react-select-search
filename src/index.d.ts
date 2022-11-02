import {
    FunctionComponent,
    Component,
    Ref,
    ReactNode,
    MutableRefObject,
} from 'react';

export type SelectSearchOption = {
    name: string;
    value?: string | number;
    type?: string;
    items?: SelectSearchOption[];
    disabled?: boolean;
    [key: string]: any;
};

export type SelectedOption = {
    name: string;
    value: string | number;
    index: number;
    disabled?: boolean;
    [key: string]: any;
};

export type SelectedOptionValue = string | number;

export type OptionSnapshot = {
    selected: boolean;
    highlighted: boolean;
};

export type DomProps = {
    tabIndex: string;
    onMouseDown: (event: MouseEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onKeyPress: (event: KeyboardEvent) => void;
    onBlur: (event: Event) => void;
    value: string;
    disabled: boolean;
};

export type ValueProps = {
    tabIndex: string;
    readonly: boolean;
    onMouseDown: (event: MouseEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onKeyUp: (event: KeyboardEvent) => void;
    onKeyPress: (event: KeyboardEvent) => void;
    onBlur: (event: Event) => void;
    value: string;
    disabled: boolean;
};

export type Snapshot = {
    value: SelectedOptionValue;
    highlighted: boolean;
    options: SelectedOptionValue[];
    disabled: boolean;
    displayValue: string;
    focus: boolean;
    search: string;
    searching: boolean;
};

export type SelectSearchProps = {
    options: SelectSearchOption[];
    defaultValue?: string | string[];
    value?: string | string[];
    multiple?: boolean;
    search?: boolean;
    disabled?: boolean;
    placeholder?: string;
    id?: string;
    autoComplete?: 'on' | 'off';
    autoFocus?: boolean;
    className?: ((classes: string) => string) | string | { readonly [key: string]: string; };
    onChange?: (
        selectedValue: SelectedOptionValue | SelectedOptionValue[],
        selectedOption: SelectedOption | SelectedOption[],
        optionSnapshot: SelectSearchProps,
    ) => void;
    closeOnSelect?: boolean;
    renderOption?: (
        domProps: DomProps,
        option: SelectedOption,
        snapshot: OptionSnapshot,
        className: string,
    ) => ReactNode;
    fuzzySearch?: boolean;
    filterOptions?: ((
        options: SelectSearchOption[],
        query: string,
    ) => SelectSearchOption[])[];
    renderValue?: (
        valueProps: ValueProps,
        snapshot: Snapshot,
        className: string,
    ) => ReactNode;
    renderGroupHeader?: (name: string) => string;
    getOptions?: (query: string) => Promise<SelectSearchOption[]>;
    debounce?: number;
    ref?: Ref<Component>;
    emptyMessage?: ReactNode | (() => ReactNode);
};

export const SelectSearch: FunctionComponent<SelectSearchProps>;

export function useSelect(Options: {
    defaultValue?: string | string[];
    value?: string | string[];
    multiple?: boolean;
    search?: boolean;
    options?: SelectSearchOption[];
    onChange?: (
        selectedValue: SelectedOptionValue | SelectedOptionValue[],
        selectedOption: SelectedOption | SelectedOption[],
        optionSnapshot: SelectSearchProps,
    ) => void;
    getOptions?: (query: string) => Promise<SelectSearchOption[]>;
    useFuzzySearch?: boolean;
    filterOptions?: ((
        options: SelectSearchOption[],
        query: string,
    ) => SelectSearchOption[])[];
    allowEmpty?: boolean;
    closeOnSelect?: boolean;
    closable?: boolean;
    debounce?: number;
}): [
    Snapshot,
    {
        tabIndex: string;
        readOnly: boolean;
        onChange: (
            selectedValue: SelectedOptionValue | SelectedOptionValue[],
            selectedOption: SelectedOption | SelectedOption[],
            optionSnapshot: SelectSearchProps,
        ) => void;
        disabled: boolean;
        onMouseDown: (event: MouseEvent) => void;
        onKeyDown: (event: KeyboardEvent) => void;
        onKeyUp: (event: KeyboardEvent) => void;
        onKeyPress: (event: KeyboardEvent) => void;
        onBlur: () => void;
        onFocus: () => void;
        ref: MutableRefObject<any>;
    },
    {
        tabIndex: string;
        onMouseDown: (event: MouseEvent) => void;
        onKeyDown: (event: KeyboardEvent) => void;
        onKeyPress: (event: KeyboardEvent) => void;
        onBlur: () => void;
    },
    (value: string) => void,
];

export default SelectSearch;
