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
}

export type SelectSearchReturnedOption = {
    name:string
    value:string
    index:number
}

export type SelectSearchState = {
    defaultOptions:SelectSearchReturnedOption[][]
    focus:boolean
    highlighted:null|SelectSearchReturnedOption
    options:SelectSearchReturnedOption[][]
    search:string
    value:string
}

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
    className?:(classes:string) => string|string
    onChange?:(optionProps:SelectSearchReturnedOption, optionData:SelectSearchState, optionSnapshot:SelectSearchProps) => void
    renderOption?:(optionProps:SelectSearchReturnedOption, optionData:SelectSearchState, optionSnapshot:SelectSearchProps) => React.ReactNode
    renderValue?:(valueProps:any, ref:React.Ref<React.Component>, selectedValue:any) => React.ReactNode
    renderGroupHeader?:(name:string) => string
    ref?:React.Ref<React.Component>
}


export const SelectSearch:React.FunctionComponent<SelectSearchProps>
export default SelectSearch
