import {useRef as $6XpKT$useRef, useState as $6XpKT$useState, useCallback as $6XpKT$useCallback, useMemo as $6XpKT$useMemo, useEffect as $6XpKT$useEffect, useReducer as $6XpKT$useReducer, forwardRef as $6XpKT$forwardRef, memo as $6XpKT$memo} from "react";
import {jsxs as $6XpKT$jsxs, jsx as $6XpKT$jsx} from "react/jsx-runtime";
import $6XpKT$proptypes from "prop-types";


function $559302edb229d5e8$export$2e2bcd8739ae039(options) {
    const nextOptions = [];
    options.forEach((option, i)=>{
        if ("groupId" in option) {
            const nextOption = {
                ...option
            };
            const groupIndex = nextOptions.findIndex((el)=>"groupId" in el && el.groupId === nextOption.groupId);
            nextOption.index = i;
            if (groupIndex > -1) nextOptions[groupIndex].items.push(nextOption);
            else nextOptions.push({
                items: [
                    nextOption
                ],
                groupId: option.groupId,
                type: "group",
                name: option.groupName
            });
        } else nextOptions.push(option);
    });
    return nextOptions;
}


function $d3c155eb796832c7$export$2e2bcd8739ae039(value) {
    if (!value) return [];
    return !Array.isArray(value) ? [
        value
    ] : [
        ...value
    ];
}


function $04aa31f32356c390$export$2e2bcd8739ae039(option) {
    return option !== null && typeof option === "object" && "value" in option && "name" in option;
}


function $f7a118348608ef0e$export$2e2bcd8739ae039(value, options) {
    if ((0, $04aa31f32356c390$export$2e2bcd8739ae039)(value)) return value;
    let newValue = value;
    if (newValue === null && options.length) {
        let i = 0;
        let defaultOption = options[0];
        while(defaultOption && defaultOption.disabled){
            if (options.length < i) defaultOption = false;
            i += 1;
            defaultOption = options[i];
        }
        if (defaultOption) newValue = defaultOption.value;
    }
    // eslint-disable-next-line eqeqeq
    return options.find((o)=>o.value == newValue);
}


function $54d060e9e68a5824$export$2e2bcd8739ae039(value, oldValue, options, multiple) {
    if (!multiple) {
        const newOption = (0, $f7a118348608ef0e$export$2e2bcd8739ae039)(value, options);
        if (newOption) return newOption;
        return oldValue;
    }
    const oldOptions = (0, $d3c155eb796832c7$export$2e2bcd8739ae039)(oldValue);
    const newOptions = (0, $d3c155eb796832c7$export$2e2bcd8739ae039)(value).map((o)=>(0, $f7a118348608ef0e$export$2e2bcd8739ae039)(o, options)).filter((o)=>o !== null && o !== undefined);
    if (!oldOptions.length) return newOptions;
    if (!newOptions.length) return oldOptions;
    newOptions.forEach((newOption)=>{
        // eslint-disable-next-line eqeqeq
        const optionIndex = oldOptions.findIndex((o)=>o.value == newOption.value);
        if (optionIndex >= 0) oldOptions.splice(optionIndex, 1);
        else oldOptions.push(newOption);
    });
    return oldOptions;
}



function $29242e7c542b89e5$export$2e2bcd8739ae039(value) {
    if (Array.isArray(value)) return value.map((o)=>(0, $04aa31f32356c390$export$2e2bcd8739ae039)(o) && o.name).join(", ");
    return (0, $04aa31f32356c390$export$2e2bcd8739ae039)(value) ? value.name : "";
}



function $89ef5f79591d26df$export$2e2bcd8739ae039(func, wait) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            timeout = null;
            func(...args);
        }, wait);
    };
}


function $ab7b6b8f43adf325$export$2e2bcd8739ae039(options) {
    return options.map((option, i)=>{
        if (option.type === "group") {
            const id = `${option.name.replace(/\s+/g, "-").toLowerCase()}-${i}`;
            return option.items.map((item)=>({
                    ...item,
                    groupId: id,
                    groupName: option.name
                }));
        }
        return {
            ...option,
            index: i
        };
    }).flat();
}


function $7263dad3c79112e7$export$2e2bcd8739ae039(q, defaultOptions, { debounceTime: debounceTime , filterOptions: filterOptions , getOptions: getOptions ,  }) {
    const [fetching, setFetching] = (0, $6XpKT$useState)(false);
    const [options, setOptions] = (0, $6XpKT$useState)(()=>(0, $ab7b6b8f43adf325$export$2e2bcd8739ae039)(defaultOptions));
    const fetch = (0, $6XpKT$useMemo)(()=>{
        const filter = filterOptions || ((op)=>()=>op);
        if (!getOptions) return (s)=>setOptions((0, $ab7b6b8f43adf325$export$2e2bcd8739ae039)(filter(defaultOptions)(s)));
        return (0, $89ef5f79591d26df$export$2e2bcd8739ae039)((s)=>{
            const optionsReq = getOptions(s, defaultOptions);
            setFetching(true);
            Promise.resolve(optionsReq).then((newOptions)=>{
                setOptions((0, $ab7b6b8f43adf325$export$2e2bcd8739ae039)(filter(newOptions)(s)));
            }).finally(()=>setFetching(false));
        }, debounceTime);
    }, [
        filterOptions,
        defaultOptions,
        getOptions,
        debounceTime
    ]);
    (0, $6XpKT$useEffect)(()=>setOptions(defaultOptions), [
        defaultOptions
    ]);
    (0, $6XpKT$useEffect)(()=>fetch(q), [
        fetch,
        q
    ]);
    return {
        options: options,
        setOptions: setOptions,
        fetching: fetching
    };
}



function $8f7d71ac34985a60$export$2e2bcd8739ae039(option) {
    if (!option) return null;
    return (0, $04aa31f32356c390$export$2e2bcd8739ae039)(option) ? option.value : null;
}


function $9f1ffae135e0749f$export$2e2bcd8739ae039(options) {
    if (Array.isArray(options)) return options.map((o)=>(0, $8f7d71ac34985a60$export$2e2bcd8739ae039)(o)).filter((v)=>v !== null);
    return (0, $8f7d71ac34985a60$export$2e2bcd8739ae039)(options);
}



function $7b9ffce6a6ebd6f4$export$2e2bcd8739ae039(highlighted, { key: key , options: options  }) {
    const max = options.length - 1;
    let newHighlighted = key === "ArrowDown" ? highlighted + 1 : highlighted - 1;
    if (newHighlighted < 0) newHighlighted = max;
    else if (newHighlighted > max) newHighlighted = 0;
    const option = options[newHighlighted];
    if (option && option.disabled) return $7b9ffce6a6ebd6f4$export$2e2bcd8739ae039(newHighlighted, {
        key: key,
        options: options
    });
    return newHighlighted;
}


function $8c63ada902e0d18e$export$2e2bcd8739ae039(defaultHighlighted, options, onSelect, ref) {
    const [highlighted, dispatchHighlighted] = (0, $6XpKT$useReducer)((0, $7b9ffce6a6ebd6f4$export$2e2bcd8739ae039), defaultHighlighted);
    const onKeyDown = (0, $6XpKT$useCallback)((e)=>{
        const { key: key  } = e;
        if ([
            "ArrowDown",
            "ArrowUp"
        ].includes(key)) {
            e.preventDefault();
            dispatchHighlighted({
                key: key,
                options: options
            });
        }
    }, [
        options
    ]);
    const onKeyPress = (0, $6XpKT$useCallback)((e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            const selected = options[highlighted];
            if (selected) onSelect(selected.value);
        }
    }, [
        options,
        highlighted,
        onSelect
    ]);
    const onKeyUp = (0, $6XpKT$useCallback)((e)=>{
        if (e.key === "Escape") {
            e.preventDefault();
            ref.current.blur();
        }
    }, [
        ref
    ]);
    return [
        highlighted,
        {
            onKeyPress: onKeyPress,
            onKeyDown: onKeyDown,
            onKeyUp: onKeyUp
        }
    ];
}


function $0d0f732c1d5a71da$export$2e2bcd8739ae039({ value: defaultValue = null , options: defaultOptions = [] , search: canSearch = false , multiple: multiple = false , disabled: disabled = false , closeOnSelect: closeOnSelect = true , getOptions: getOptionsFn = null , filterOptions: filterOptions = null , onChange: onChange = ()=>{} , onFocus: onFocus = ()=>{} , onBlur: onBlur = ()=>{} , debounce: debounce = 0 ,  }) {
    const initialValue = (0, $6XpKT$useRef)(null);
    const ref = (0, $6XpKT$useRef)(null);
    const [value, setValue] = (0, $6XpKT$useState)(null);
    const [search, setSearch] = (0, $6XpKT$useState)("");
    const [focus, setFocus] = (0, $6XpKT$useState)(false);
    const { options: options , fetching: fetching  } = (0, $7263dad3c79112e7$export$2e2bcd8739ae039)(search, defaultOptions, {
        getOptions: getOptionsFn,
        filterOptions: filterOptions,
        debounceTime: debounce
    });
    const onSelect = (0, $6XpKT$useCallback)((newValue)=>{
        const newOption = (0, $54d060e9e68a5824$export$2e2bcd8739ae039)(newValue, value, Array.isArray(value) ? [
            ...value,
            ...options
        ] : options, multiple);
        setValue(newOption);
        onChange((0, $9f1ffae135e0749f$export$2e2bcd8739ae039)(newOption), newOption);
        if (closeOnSelect) ref.current.blur();
    }, [
        closeOnSelect,
        multiple,
        onChange,
        value,
        options
    ]);
    const [highlighted, keyboardEvents] = (0, $8c63ada902e0d18e$export$2e2bcd8739ae039)(-1, options, onSelect, ref);
    const snapshot = (0, $6XpKT$useMemo)(()=>({
            options: (0, $559302edb229d5e8$export$2e2bcd8739ae039)(options),
            option: value,
            displayValue: (0, $29242e7c542b89e5$export$2e2bcd8739ae039)(value),
            value: (0, $9f1ffae135e0749f$export$2e2bcd8739ae039)(value),
            search: search,
            fetching: fetching,
            focus: focus,
            highlighted: highlighted,
            disabled: disabled
        }), [
        disabled,
        fetching,
        focus,
        highlighted,
        search,
        value,
        options
    ]);
    const onMouseDown = (0, $6XpKT$useCallback)((e)=>{
        e.preventDefault();
        onSelect(e.currentTarget.value);
    }, [
        onSelect
    ]);
    const onFocusCb = (0, $6XpKT$useCallback)((e)=>{
        setFocus(true);
        onFocus(e);
    }, [
        onFocus
    ]);
    const onBlurCb = (0, $6XpKT$useCallback)((e)=>{
        setFocus(false);
        setSearch("");
        onBlur(e);
    }, [
        onBlur
    ]);
    const valueProps = (0, $6XpKT$useMemo)(()=>({
            tabIndex: "0",
            readOnly: !canSearch,
            ...keyboardEvents,
            onFocus: onFocusCb,
            onBlur: onBlurCb,
            onChange: canSearch ? ({ target: target  })=>setSearch(target.value) : null,
            disabled: disabled,
            ref: ref
        }), [
        canSearch,
        keyboardEvents,
        onFocusCb,
        onBlurCb,
        disabled
    ]);
    const optionProps = (0, $6XpKT$useMemo)(()=>({
            tabIndex: "-1",
            onMouseDown: onMouseDown
        }), [
        onMouseDown
    ]);
    (0, $6XpKT$useEffect)(()=>{
        if (defaultValue !== null && initialValue.current === defaultValue) return;
        initialValue.current = defaultValue;
        setValue((0, $54d060e9e68a5824$export$2e2bcd8739ae039)(defaultValue, null, options, multiple));
    }, [
        defaultValue,
        initialValue,
        multiple,
        options
    ]);
    console.log(snapshot);
    return [
        snapshot,
        valueProps,
        optionProps,
        setValue
    ];
}







const $8d3faf6abcc79d43$var$option = (0, $6XpKT$proptypes).shape({
    name: (0, $6XpKT$proptypes).string.isRequired,
    value: (0, $6XpKT$proptypes).oneOfType([
        (0, $6XpKT$proptypes).string,
        (0, $6XpKT$proptypes).number, 
    ]).isRequired
});
const $8d3faf6abcc79d43$export$7de5fae3688fa523 = (0, $6XpKT$proptypes).oneOfType([
    $8d3faf6abcc79d43$var$option,
    (0, $6XpKT$proptypes).shape({
        name: (0, $6XpKT$proptypes).string.isRequired,
        type: (0, $6XpKT$proptypes).string.isRequired,
        items: (0, $6XpKT$proptypes).arrayOf($8d3faf6abcc79d43$var$option)
    }), 
]);
const $8d3faf6abcc79d43$export$4d11a2a2ed2260f1 = (0, $6XpKT$proptypes).oneOfType([
    (0, $6XpKT$proptypes).string,
    (0, $6XpKT$proptypes).number,
    (0, $6XpKT$proptypes).arrayOf((0, $6XpKT$proptypes).oneOfType([
        (0, $6XpKT$proptypes).string,
        (0, $6XpKT$proptypes).number
    ])), 
]);












function $461fda4bde208857$export$2e2bcd8739ae039(classNames) {
    return Object.entries(classNames).filter(([cls, display])=>cls && display).map(([cls])=>cls).join(" ");
}


function $1980bf7a0b02fa21$var$Option({ optionProps: optionProps , highlighted: highlighted , selected: selected , option: option , cls: cls , renderOption: renderOption ,  }) {
    const props = {
        ...optionProps,
        value: option.value,
        disabled: option.disabled
    };
    const className = (0, $461fda4bde208857$export$2e2bcd8739ae039)({
        [cls("option")]: true,
        [cls("is-selected")]: selected,
        [cls("is-highlighted")]: highlighted
    });
    return /*#__PURE__*/ (0, $6XpKT$jsxs)("li", {
        className: cls("row"),
        role: "menuitem",
        "data-index": option.index,
        "data-value": escape(option.value),
        children: [
            renderOption && renderOption(props, option, {
                selected: selected,
                highlighted: highlighted
            }, className),
            !renderOption && /*#__PURE__*/ (0, $6XpKT$jsx)("button", {
                type: "button",
                className: className,
                ...props,
                children: option.name
            })
        ]
    }, option.value);
}
$1980bf7a0b02fa21$var$Option.defaultProps = {
    renderOption: null
};
$1980bf7a0b02fa21$var$Option.propTypes = {
    option: (0, $6XpKT$proptypes).shape({
        name: (0, $6XpKT$proptypes).string.isRequired,
        value: (0, $6XpKT$proptypes).oneOfType([
            (0, $6XpKT$proptypes).string,
            (0, $6XpKT$proptypes).number
        ]),
        disabled: (0, $6XpKT$proptypes).bool,
        index: (0, $6XpKT$proptypes).number
    }).isRequired,
    highlighted: (0, $6XpKT$proptypes).bool.isRequired,
    selected: (0, $6XpKT$proptypes).bool.isRequired,
    optionProps: (0, $6XpKT$proptypes).shape({
        tabIndex: (0, $6XpKT$proptypes).string.isRequired,
        onMouseDown: (0, $6XpKT$proptypes).func.isRequired
    }).isRequired,
    cls: (0, $6XpKT$proptypes).func.isRequired,
    renderOption: (0, $6XpKT$proptypes).func
};
var $1980bf7a0b02fa21$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $6XpKT$memo)($1980bf7a0b02fa21$var$Option);


function $b5eecf9f88e2d7ae$export$2e2bcd8739ae039(itemValue, selectedValue) {
    if (!selectedValue) return false;
    return Array.isArray(selectedValue) ? selectedValue.findIndex((item)=>item.value == itemValue.value) >= 0 : selectedValue.value == itemValue.value;
}



function $4fb367dd47e9a360$var$OptionsList({ options: options , optionProps: optionProps , snapshot: snapshot , renderOption: renderOption , renderGroupHeader: renderGroupHeader , cls: cls ,  }) {
    return /*#__PURE__*/ (0, $6XpKT$jsx)("ul", {
        className: cls("options"),
        children: options.map((o)=>{
            if (o.type === "group") return /*#__PURE__*/ (0, $6XpKT$jsx)("li", {
                role: "none",
                className: cls("row"),
                children: /*#__PURE__*/ (0, $6XpKT$jsxs)("div", {
                    className: cls("group"),
                    children: [
                        /*#__PURE__*/ (0, $6XpKT$jsx)("div", {
                            className: cls("group-header"),
                            children: renderGroupHeader ? renderGroupHeader(o.name) : o.name
                        }),
                        /*#__PURE__*/ (0, $6XpKT$jsx)("ul", {
                            className: cls("options"),
                            children: /*#__PURE__*/ (0, $6XpKT$jsx)($4fb367dd47e9a360$var$OptionsList, {
                                optionProps: optionProps,
                                snapshot: snapshot,
                                options: o.items,
                                renderOption: renderOption,
                                renderGroupHeader: renderGroupHeader,
                                cls: cls
                            })
                        })
                    ]
                })
            }, o.groupId);
            return /*#__PURE__*/ (0, $6XpKT$jsx)((0, $1980bf7a0b02fa21$export$2e2bcd8739ae039), {
                selected: (0, $b5eecf9f88e2d7ae$export$2e2bcd8739ae039)(o, snapshot.option),
                highlighted: snapshot.highlighted === o.index,
                option: o,
                optionProps: optionProps,
                cls: cls,
                renderOption: renderOption
            }, o.value);
        })
    });
}
$4fb367dd47e9a360$var$OptionsList.defaultProps = {
    renderGroupHeader: null,
    renderOption: null
};
$4fb367dd47e9a360$var$OptionsList.propTypes = {
    options: (0, $6XpKT$proptypes).arrayOf((0, $8d3faf6abcc79d43$export$7de5fae3688fa523)).isRequired,
    optionProps: (0, $6XpKT$proptypes).shape({}).isRequired,
    snapshot: (0, $6XpKT$proptypes).shape({
        highlighted: (0, $6XpKT$proptypes).number.isRequired,
        option: (0, $6XpKT$proptypes).oneOfType([
            (0, $8d3faf6abcc79d43$export$7de5fae3688fa523),
            (0, $6XpKT$proptypes).arrayOf((0, $8d3faf6abcc79d43$export$7de5fae3688fa523))
        ])
    }).isRequired,
    cls: (0, $6XpKT$proptypes).func.isRequired,
    renderGroupHeader: (0, $6XpKT$proptypes).func,
    renderOption: (0, $6XpKT$proptypes).func
};
var $4fb367dd47e9a360$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $6XpKT$memo)($4fb367dd47e9a360$var$OptionsList);


function $97da562a6ba09906$var$Options({ options: options , optionProps: optionProps , snapshot: snapshot , cls: cls , renderGroupHeader: renderGroupHeader , renderOption: renderOption , emptyMessage: emptyMessage ,  }) {
    const selectRef = (0, $6XpKT$useRef)(null);
    const { value: value , highlighted: highlighted  } = snapshot;
    const renderEmptyMessage = (0, $6XpKT$useCallback)(()=>{
        if (emptyMessage === null) return null;
        return /*#__PURE__*/ (0, $6XpKT$jsx)("li", {
            className: cls("not-found"),
            children: typeof emptyMessage === "function" ? emptyMessage() : emptyMessage
        });
    }, [
        emptyMessage,
        cls
    ]);
    (0, $6XpKT$useEffect)(()=>{
        const { current: current  } = selectRef;
        if (!current || highlighted < 0 && value === null) return;
        const val = Array.isArray(value) ? value[0] : value;
        const query = highlighted > -1 ? `[data-index="${highlighted}"]` : `[data-value="${escape(val)}"]`;
        const selected = current.querySelector(query);
        if (selected) {
            const rect = current.getBoundingClientRect();
            const selectedRect = selected.getBoundingClientRect();
            current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
        }
    }, [
        value,
        highlighted,
        selectRef
    ]);
    return(// eslint-disable-next-line jsx-a11y/no-static-element-interactions
    /*#__PURE__*/ (0, $6XpKT$jsx)("div", {
        className: cls("select"),
        ref: selectRef,
        onMouseDown: (e)=>e.preventDefault(),
        children: options.length ? /*#__PURE__*/ (0, $6XpKT$jsx)((0, $4fb367dd47e9a360$export$2e2bcd8739ae039), {
            optionProps: optionProps,
            snapshot: snapshot,
            options: options,
            renderOption: renderOption,
            renderGroupHeader: renderGroupHeader,
            cls: cls
        }) : /*#__PURE__*/ (0, $6XpKT$jsx)("ul", {
            className: cls("options"),
            children: renderEmptyMessage()
        })
    }));
}
$97da562a6ba09906$var$Options.defaultProps = {
    renderOption: null,
    renderGroupHeader: null,
    emptyMessage: null
};
$97da562a6ba09906$var$Options.propTypes = {
    options: (0, $6XpKT$proptypes).arrayOf((0, $8d3faf6abcc79d43$export$7de5fae3688fa523)).isRequired,
    optionProps: (0, $6XpKT$proptypes).shape({
        tabIndex: (0, $6XpKT$proptypes).string.isRequired,
        onMouseDown: (0, $6XpKT$proptypes).func.isRequired
    }).isRequired,
    snapshot: (0, $6XpKT$proptypes).shape({
        highlighted: (0, $6XpKT$proptypes).number.isRequired,
        value: (0, $8d3faf6abcc79d43$export$4d11a2a2ed2260f1)
    }).isRequired,
    cls: (0, $6XpKT$proptypes).func.isRequired,
    renderGroupHeader: (0, $6XpKT$proptypes).func,
    renderOption: (0, $6XpKT$proptypes).func,
    emptyMessage: (0, $6XpKT$proptypes).oneOfType([
        (0, $6XpKT$proptypes).string,
        (0, $6XpKT$proptypes).func, 
    ])
};
var $97da562a6ba09906$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $6XpKT$memo)($97da562a6ba09906$var$Options);



function $f38eb3520acbc2e0$export$2e2bcd8739ae039(className) {
    return (0, $6XpKT$useCallback)((key)=>{
        if (typeof className === "function") return className(key);
        if (key.indexOf("container") === 0) return key.replace("container", className);
        if (key.indexOf("is-") === 0 || key.indexOf("has-") === 0) return key;
        return `${className.split(" ")[0]}__${key}`;
    }, [
        className
    ]);
}



const $00d3317695af813e$var$SelectSearch = /*#__PURE__*/ (0, $6XpKT$forwardRef)(({ value: defaultValue , disabled: disabled , placeholder: placeholder , multiple: multiple , search: search , autoFocus: autoFocus , autoComplete: autoComplete , options: defaultOptions , id: id , onChange: onChange , onFocus: onFocus , onBlur: onBlur , printOptions: printOptions , closeOnSelect: closeOnSelect , className: className , renderValue: renderValue , renderOption: renderOption , renderGroupHeader: renderGroupHeader , getOptions: getOptions , filterOptions: filterOptions , debounce: debounce , emptyMessage: emptyMessage ,  }, ref)=>{
    const cls = (0, $f38eb3520acbc2e0$export$2e2bcd8739ae039)(className);
    const [snapshot, valueProps, optionProps] = (0, $0d0f732c1d5a71da$export$2e2bcd8739ae039)({
        options: defaultOptions,
        value: defaultValue === null && (placeholder || multiple) ? "" : defaultValue,
        multiple: multiple,
        disabled: disabled,
        search: search,
        onChange: onChange,
        onFocus: onFocus,
        onBlur: onBlur,
        closeOnSelect: closeOnSelect && (!multiple || [
            "on-focus",
            "always"
        ].includes(printOptions)),
        getOptions: getOptions,
        filterOptions: filterOptions,
        debounce: debounce
    });
    const wrapperClass = (0, $461fda4bde208857$export$2e2bcd8739ae039)({
        [cls("container")]: true,
        [cls("is-disabled")]: disabled,
        [cls("is-loading")]: snapshot.fetching,
        [cls("has-focus")]: snapshot.focus
    });
    let shouldRenderOptions;
    switch(printOptions){
        case "never":
            shouldRenderOptions = false;
            break;
        case "always":
            shouldRenderOptions = true;
            break;
        case "on-focus":
            shouldRenderOptions = snapshot.focus;
            break;
        default:
            shouldRenderOptions = !disabled && (snapshot.focus || multiple);
            break;
    }
    const shouldRenderValue = !multiple || placeholder || search;
    const props = {
        ...valueProps,
        placeholder: placeholder,
        autoFocus: autoFocus,
        autoComplete: autoComplete,
        value: snapshot.focus && search ? snapshot.search : snapshot.displayValue
    };
    return /*#__PURE__*/ (0, $6XpKT$jsxs)("div", {
        ref: ref,
        className: wrapperClass,
        id: id,
        children: [
            shouldRenderValue && /*#__PURE__*/ (0, $6XpKT$jsxs)("div", {
                className: cls("value"),
                children: [
                    renderValue && renderValue(props, snapshot, cls("input")),
                    !renderValue && /*#__PURE__*/ (0, $6XpKT$jsx)("input", {
                        ...props,
                        className: cls("input")
                    })
                ]
            }),
            shouldRenderOptions && /*#__PURE__*/ (0, $6XpKT$jsx)((0, $97da562a6ba09906$export$2e2bcd8739ae039), {
                options: snapshot.options,
                optionProps: optionProps,
                snapshot: snapshot,
                cls: cls,
                emptyMessage: emptyMessage,
                renderOption: renderOption,
                renderGroupHeader: renderGroupHeader
            })
        ]
    });
});
$00d3317695af813e$var$SelectSearch.defaultProps = {
    // Data
    getOptions: null,
    filterOptions: null,
    value: null,
    // Interaction
    multiple: false,
    search: false,
    disabled: false,
    printOptions: "auto",
    closeOnSelect: true,
    debounce: 0,
    // Attributes
    placeholder: null,
    id: null,
    autoFocus: false,
    autoComplete: "on",
    // Design
    className: "select-search",
    // Renderers
    renderOption: undefined,
    renderGroupHeader: undefined,
    renderValue: undefined,
    emptyMessage: null,
    // Events
    onChange: ()=>{},
    onFocus: ()=>{},
    onBlur: ()=>{}
};
$00d3317695af813e$var$SelectSearch.propTypes = {
    // Data
    options: (0, $6XpKT$proptypes).arrayOf((0, $8d3faf6abcc79d43$export$7de5fae3688fa523)).isRequired,
    getOptions: (0, $6XpKT$proptypes).func,
    filterOptions: (0, $6XpKT$proptypes).func,
    value: (0, $8d3faf6abcc79d43$export$4d11a2a2ed2260f1),
    // Interaction
    multiple: (0, $6XpKT$proptypes).bool,
    search: (0, $6XpKT$proptypes).bool,
    disabled: (0, $6XpKT$proptypes).bool,
    printOptions: (0, $6XpKT$proptypes).oneOf([
        "auto",
        "always",
        "never",
        "on-focus"
    ]),
    closeOnSelect: (0, $6XpKT$proptypes).bool,
    debounce: (0, $6XpKT$proptypes).number,
    // Attributes
    placeholder: (0, $6XpKT$proptypes).string,
    id: (0, $6XpKT$proptypes).string,
    autoComplete: (0, $6XpKT$proptypes).string,
    autoFocus: (0, $6XpKT$proptypes).bool,
    // Design
    className: (0, $6XpKT$proptypes).oneOfType([
        (0, $6XpKT$proptypes).string,
        (0, $6XpKT$proptypes).func, 
    ]),
    // Renderers
    renderOption: (0, $6XpKT$proptypes).func,
    renderGroupHeader: (0, $6XpKT$proptypes).func,
    renderValue: (0, $6XpKT$proptypes).func,
    emptyMessage: (0, $6XpKT$proptypes).oneOfType([
        (0, $6XpKT$proptypes).string,
        (0, $6XpKT$proptypes).func, 
    ]),
    // Events
    onChange: (0, $6XpKT$proptypes).func,
    onFocus: (0, $6XpKT$proptypes).func,
    onBlur: (0, $6XpKT$proptypes).func
};
var $00d3317695af813e$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $6XpKT$memo)($00d3317695af813e$var$SelectSearch);


function $ef504720cdfc4bdc$var$fuzzy(q, text) {
    const searchLength = q.length;
    const textLength = text.length;
    if (searchLength > textLength) return false;
    if (text.indexOf(q) >= 0) return true;
    let match = true;
    for(let i = 0, j = 0; i < searchLength; i += 1){
        const ch = q.charCodeAt(i);
        while(j < textLength){
            // eslint-disable-next-line no-plusplus
            if (text.charCodeAt(j++) === ch) break;
            match = false;
        }
        if (!match) return false;
    }
    return true;
}
function $ef504720cdfc4bdc$var$search(item, query) {
    const name = item.name.toLowerCase();
    if ($ef504720cdfc4bdc$var$fuzzy(query, name)) return true;
    return item.groupName && $ef504720cdfc4bdc$var$fuzzy(query, item.groupName.toLowerCase());
}
function $ef504720cdfc4bdc$export$2e2bcd8739ae039(options) {
    return (query)=>{
        if (!query.length) return options;
        const q = query.toLowerCase();
        return options.filter((option)=>$ef504720cdfc4bdc$var$search(option, q));
    };
}




export {$0d0f732c1d5a71da$export$2e2bcd8739ae039 as useSelect, $00d3317695af813e$export$2e2bcd8739ae039 as default, $ef504720cdfc4bdc$export$2e2bcd8739ae039 as fuzzySearch};
//# sourceMappingURL=index.js.map
