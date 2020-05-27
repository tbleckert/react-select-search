import React from 'react'

export type FuseOption = {
    keys:string[]
    threshold:number
}

export type SelectSearchOption = {
    name:string
    value:string
    type?:string
    items?:SelectSearchOption[]
    disabled?:boolean
    photo?:string
}

export type SelectedOptionValue = {
    name:string
    value:string
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
    autoComplete?:'on'|'off'
    autoFocus?:boolean
    fuse?:FuseOption|boolean
    className?:((classes:string) => string)|string
    onChange?:(selectedValue:SelectedOptionValue|SelectedOptionValue[], selectedOption:SelectedOption|SelectedOption[], optionSnapshot:SelectSearchProps) => void
    printOptions?:PrintOptions
    closeOnSelect?:boolean
    renderOption?:(domProps:DomProps, option:SelectedOption, snapshot:OptionSnapshot, className:string) => React.ReactNode
    renderValue?:(valueProps:ValueProps, snapshot:ValueSnapshot, className:string) => React.ReactNode
    renderGroupHeader?:(name:string) => string
    getOptions?:(query:string) => Promise<SelectedOption>
    ref?:React.Ref<React.Component>
}


export const SelectSearch:React.FunctionComponent<SelectSearchProps>
export default SelectSearch
