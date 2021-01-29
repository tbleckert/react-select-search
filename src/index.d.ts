import {
    FunctionComponent,
    Component,
    Ref,
    ReactNode,
    MutableRefObject,
} from 'react'

export type SelectSearchOption = {
    name:string
    value:string|number
    type?:string
    items?:SelectSearchOption[]
    disabled?:boolean
    photo?:string
}

export type SelectedOptionValue = {
    name:string
    value:string|number
    index:number
    photo?:string
    disabled?:boolean
}

export type SelectedOption = {
    defaultOptions:SelectedOptionValue[][]
    focus:boolean
    highlighted:null|SelectedOptionValue
    options:SelectedOptionValue[][]
    search:string
    value:string
}

export type OptionSnapshot = {
    selected:boolean
    highlighted:boolean
}


export type DomProps = {
    tabIndex:string
    onMouseDown:(event:MouseEvent) => void
    onKeyDown:(event:KeyboardEvent) => void
    onKeyPress:(event:KeyboardEvent) => void
    onBlur:(event:Event) => void
    value:string
    disabled:boolean
}

export type ValueProps = {
    tabIndex:string
    readonly:boolean
    onMouseDown:(event:MouseEvent) => void
    onKeyDown:(event:KeyboardEvent) => void
    onKeyUp:(event:KeyboardEvent) => void
    onKeyPress:(event:KeyboardEvent) => void
    onBlur:(event:Event) => void
    value:string
    disabled:boolean
}

export type ValueSnapshot = {
    value:SelectedOptionValue
    highlighted:boolean
    options:SelectedOptionValue[]
    disabled:boolean
    displayValue:string
    focus:boolean
    search:string
    searching:boolean
}

export type PrintOptions = 'auto'|'always'|'never'|'on-focus'

export type SelectSearchProps = {
    options:SelectSearchOption[]
    value?:string|string[]
    multiple?:boolean
    search?:boolean
    disabled?:boolean
    placeholder?:string
    id?:string
    autoComplete?:'on'|'off'
    autoFocus?:boolean
    className?:((classes:string) => string)|string
    onChange?:(selectedValue:SelectedOptionValue|SelectedOptionValue[], selectedOption:SelectedOption|SelectedOption[], optionSnapshot:SelectSearchProps) => void
    printOptions?:PrintOptions
    closeOnSelect?:boolean
    renderOption?:(domProps:DomProps, option:SelectedOption, snapshot:OptionSnapshot, className:string) => ReactNode
    filterOptions?:(options: SelectSearchOption[]) => (query:string) => SelectSearchOption[],
    renderValue?:(valueProps:ValueProps, snapshot:ValueSnapshot, className:string) => ReactNode
    renderGroupHeader?:(name:string) => string
    getOptions?: (query:string) => Promise<SelectSearchOption[]>
    ref?:Ref<Component>
}


export const SelectSearch:FunctionComponent<SelectSearchProps>

export function useSelect(Options: {
    value?:string|string[],
    disabled?:boolean,
    multiple?:boolean,
    search?:boolean,
    options?:SelectSearchOption[],
    onChange?:(selectedValue:SelectedOptionValue|SelectedOptionValue[], selectedOption:SelectedOption|SelectedOption[], optionSnapshot:SelectSearchProps) => void,
    getOptions?:(query:string) => Promise<SelectSearchOption[]>,
    filterOptions?:(options: SelectSearchOption[]) => (query:string) => SelectSearchOption[],
    allowEmpty?:boolean,
    closeOnSelect?:boolean,
    closable?:boolean,
}): [
    ValueSnapshot,
    {
        tabIndex:string;
        readOnly:boolean;
        onChange:(selectedValue:SelectedOptionValue|SelectedOptionValue[], selectedOption:SelectedOption|SelectedOption[], optionSnapshot:SelectSearchProps) => void;
        disabled:boolean;
        onMouseDown:(event:MouseEvent) => void;
        onKeyDown:(event:KeyboardEvent) => void;
        onKeyUp:(event:KeyboardEvent) => void;
        onKeyPress:(event:KeyboardEvent) => void;
        onBlur:() => void;
        onFocus:() => void;
        ref:MutableRefObject<any>;
    },
    {
        tabIndex:string;
        onMouseDown:(event:MouseEvent) => void;
        onKeyDown:(event:KeyboardEvent) => void;
        onKeyPress:(event:KeyboardEvent) => void;
        onBlur:() => void;
    },
    (value:string) => void
]

export function fuzzySearch(options: SelectSearchOption[]): (query:string) => SelectSearchOption[]

export default SelectSearch
