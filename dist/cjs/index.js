var $a9A1a$react = require("react");
var $a9A1a$reactjsxruntime = require("react/jsx-runtime");
var $a9A1a$proptypes = require("prop-types");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "useSelect", () => $4bbd6d22e42ff57c$export$2e2bcd8739ae039);
$parcel$export(module.exports, "default", () => $fdefef8b289dc6d0$export$2e2bcd8739ae039);
$parcel$export(module.exports, "fuzzySearch", () => $b33d78a6671ffa6c$export$2e2bcd8739ae039);

function $d5af33248d9ae6a9$export$2e2bcd8739ae039(options) {
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


function $9257cd4e5b64e23f$export$2e2bcd8739ae039(value) {
    if (!value) return [];
    return !Array.isArray(value) ? [
        value
    ] : [
        ...value
    ];
}


function $c867dc4d0debea68$export$2e2bcd8739ae039(option) {
    return option !== null && typeof option === "object" && "value" in option && "name" in option;
}


function $595e451383f14c00$export$2e2bcd8739ae039(value, options) {
    if ((0, $c867dc4d0debea68$export$2e2bcd8739ae039)(value)) return value;
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


function $3ee920e8b5fd7d53$export$2e2bcd8739ae039(value, oldValue, options, multiple) {
    if (!multiple) {
        const newOption = (0, $595e451383f14c00$export$2e2bcd8739ae039)(value, options);
        if (newOption) return newOption;
        return oldValue;
    }
    const oldOptions = (0, $9257cd4e5b64e23f$export$2e2bcd8739ae039)(oldValue);
    const newOptions = (0, $9257cd4e5b64e23f$export$2e2bcd8739ae039)(value).map((o)=>(0, $595e451383f14c00$export$2e2bcd8739ae039)(o, options)).filter((o)=>o !== null && o !== undefined);
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



function $53ccf5af3f1de595$export$2e2bcd8739ae039(value) {
    if (Array.isArray(value)) return value.map((o)=>(0, $c867dc4d0debea68$export$2e2bcd8739ae039)(o) && o.name).join(", ");
    return (0, $c867dc4d0debea68$export$2e2bcd8739ae039)(value) ? value.name : "";
}



function $15d4bb7edf93a60f$export$2e2bcd8739ae039(func, wait) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            timeout = null;
            func(...args);
        }, wait);
    };
}


function $31a928e85073dee8$export$2e2bcd8739ae039(options) {
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


function $7617588f5da179bf$export$2e2bcd8739ae039(q, defaultOptions, { debounceTime: debounceTime , filterOptions: filterOptions , getOptions: getOptions ,  }) {
    const [fetching, setFetching] = (0, $a9A1a$react.useState)(false);
    const [options, setOptions] = (0, $a9A1a$react.useState)(()=>(0, $31a928e85073dee8$export$2e2bcd8739ae039)(defaultOptions));
    const fetch = (0, $a9A1a$react.useMemo)(()=>{
        const filter = filterOptions || ((op)=>()=>op);
        if (!getOptions) return (s)=>setOptions((0, $31a928e85073dee8$export$2e2bcd8739ae039)(filter(defaultOptions)(s)));
        return (0, $15d4bb7edf93a60f$export$2e2bcd8739ae039)((s)=>{
            const optionsReq = getOptions(s, defaultOptions);
            setFetching(true);
            Promise.resolve(optionsReq).then((newOptions)=>{
                setOptions((0, $31a928e85073dee8$export$2e2bcd8739ae039)(filter(newOptions)(s)));
            }).finally(()=>setFetching(false));
        }, debounceTime);
    }, [
        filterOptions,
        defaultOptions,
        getOptions,
        debounceTime
    ]);
    (0, $a9A1a$react.useEffect)(()=>setOptions(defaultOptions), [
        defaultOptions
    ]);
    (0, $a9A1a$react.useEffect)(()=>fetch(q), [
        fetch,
        q
    ]);
    return {
        options: options,
        setOptions: setOptions,
        fetching: fetching
    };
}



function $2664d3f4613d5d45$export$2e2bcd8739ae039(option) {
    if (!option) return null;
    return (0, $c867dc4d0debea68$export$2e2bcd8739ae039)(option) ? option.value : null;
}


function $b030dec93a6e3383$export$2e2bcd8739ae039(options) {
    if (Array.isArray(options)) return options.map((o)=>(0, $2664d3f4613d5d45$export$2e2bcd8739ae039)(o)).filter((v)=>v !== null);
    return (0, $2664d3f4613d5d45$export$2e2bcd8739ae039)(options);
}



function $40011fcf67f756b6$export$2e2bcd8739ae039(highlighted, { key: key , options: options  }) {
    const max = options.length - 1;
    let newHighlighted = key === "ArrowDown" ? highlighted + 1 : highlighted - 1;
    if (newHighlighted < 0) newHighlighted = max;
    else if (newHighlighted > max) newHighlighted = 0;
    const option = options[newHighlighted];
    if (option && option.disabled) return $40011fcf67f756b6$export$2e2bcd8739ae039(newHighlighted, {
        key: key,
        options: options
    });
    return newHighlighted;
}


function $b4df433b5f503385$export$2e2bcd8739ae039(defaultHighlighted, options, onSelect, ref) {
    const [highlighted, dispatchHighlighted] = (0, $a9A1a$react.useReducer)((0, $40011fcf67f756b6$export$2e2bcd8739ae039), defaultHighlighted);
    const onKeyDown = (0, $a9A1a$react.useCallback)((e)=>{
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
    const onKeyPress = (0, $a9A1a$react.useCallback)((e)=>{
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
    const onKeyUp = (0, $a9A1a$react.useCallback)((e)=>{
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


function $4bbd6d22e42ff57c$export$2e2bcd8739ae039({ value: defaultValue = null , options: defaultOptions = [] , search: canSearch = false , multiple: multiple = false , disabled: disabled = false , closeOnSelect: closeOnSelect = true , getOptions: getOptionsFn = null , filterOptions: filterOptions = null , onChange: onChange = ()=>{} , onFocus: onFocus = ()=>{} , onBlur: onBlur = ()=>{} , debounce: debounce = 0 ,  }) {
    const initialValue = (0, $a9A1a$react.useRef)(null);
    const ref = (0, $a9A1a$react.useRef)(null);
    const [value, setValue] = (0, $a9A1a$react.useState)(null);
    const [search, setSearch] = (0, $a9A1a$react.useState)("");
    const [focus, setFocus] = (0, $a9A1a$react.useState)(false);
    const { options: options , fetching: fetching  } = (0, $7617588f5da179bf$export$2e2bcd8739ae039)(search, defaultOptions, {
        getOptions: getOptionsFn,
        filterOptions: filterOptions,
        debounceTime: debounce
    });
    const onSelect = (0, $a9A1a$react.useCallback)((newValue)=>{
        const newOption = (0, $3ee920e8b5fd7d53$export$2e2bcd8739ae039)(newValue, value, Array.isArray(value) ? [
            ...value,
            ...options
        ] : options, multiple);
        setValue(newOption);
        onChange((0, $b030dec93a6e3383$export$2e2bcd8739ae039)(newOption), newOption);
        if (closeOnSelect) ref.current.blur();
    }, [
        closeOnSelect,
        multiple,
        onChange,
        value,
        options
    ]);
    const [highlighted, keyboardEvents] = (0, $b4df433b5f503385$export$2e2bcd8739ae039)(-1, options, onSelect, ref);
    const snapshot = (0, $a9A1a$react.useMemo)(()=>({
            options: (0, $d5af33248d9ae6a9$export$2e2bcd8739ae039)(options),
            option: value,
            displayValue: (0, $53ccf5af3f1de595$export$2e2bcd8739ae039)(value),
            value: (0, $b030dec93a6e3383$export$2e2bcd8739ae039)(value),
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
    const onMouseDown = (0, $a9A1a$react.useCallback)((e)=>{
        e.preventDefault();
        onSelect(e.currentTarget.value);
    }, [
        onSelect
    ]);
    const onFocusCb = (0, $a9A1a$react.useCallback)((e)=>{
        setFocus(true);
        onFocus(e);
    }, [
        onFocus
    ]);
    const onBlurCb = (0, $a9A1a$react.useCallback)((e)=>{
        setFocus(false);
        setSearch("");
        onBlur(e);
    }, [
        onBlur
    ]);
    const valueProps = (0, $a9A1a$react.useMemo)(()=>({
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
    const optionProps = (0, $a9A1a$react.useMemo)(()=>({
            tabIndex: "-1",
            onMouseDown: onMouseDown
        }), [
        onMouseDown
    ]);
    (0, $a9A1a$react.useEffect)(()=>{
        if (defaultValue !== null && initialValue.current === defaultValue) return;
        initialValue.current = defaultValue;
        setValue((0, $3ee920e8b5fd7d53$export$2e2bcd8739ae039)(defaultValue, null, options, multiple));
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







const $d1a0435212973db8$var$option = (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
    name: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired,
    value: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
        (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
        (0, ($parcel$interopDefault($a9A1a$proptypes))).number, 
    ]).isRequired
});
const $d1a0435212973db8$export$7de5fae3688fa523 = (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
    $d1a0435212973db8$var$option,
    (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
        name: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired,
        type: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired,
        items: (0, ($parcel$interopDefault($a9A1a$proptypes))).arrayOf($d1a0435212973db8$var$option)
    }), 
]);
const $d1a0435212973db8$export$4d11a2a2ed2260f1 = (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
    (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
    (0, ($parcel$interopDefault($a9A1a$proptypes))).number,
    (0, ($parcel$interopDefault($a9A1a$proptypes))).arrayOf((0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
        (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
        (0, ($parcel$interopDefault($a9A1a$proptypes))).number
    ])), 
]);












function $801112dfb0745bfa$export$2e2bcd8739ae039(classNames) {
    return Object.entries(classNames).filter(([cls, display])=>cls && display).map(([cls])=>cls).join(" ");
}


function $bdfc54d525ec4073$var$Option({ optionProps: optionProps , highlighted: highlighted , selected: selected , option: option , cls: cls , renderOption: renderOption ,  }) {
    const props = {
        ...optionProps,
        value: option.value,
        disabled: option.disabled
    };
    const className = (0, $801112dfb0745bfa$export$2e2bcd8739ae039)({
        [cls("option")]: true,
        [cls("is-selected")]: selected,
        [cls("is-highlighted")]: highlighted
    });
    return /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsxs)("li", {
        className: cls("row"),
        role: "menuitem",
        "data-index": option.index,
        "data-value": escape(option.value),
        children: [
            renderOption && renderOption(props, option, {
                selected: selected,
                highlighted: highlighted
            }, className),
            !renderOption && /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("button", {
                type: "button",
                className: className,
                ...props,
                children: option.name
            })
        ]
    }, option.value);
}
$bdfc54d525ec4073$var$Option.defaultProps = {
    renderOption: null
};
$bdfc54d525ec4073$var$Option.propTypes = {
    option: (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
        name: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired,
        value: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
            (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
            (0, ($parcel$interopDefault($a9A1a$proptypes))).number
        ]),
        disabled: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool,
        index: (0, ($parcel$interopDefault($a9A1a$proptypes))).number
    }).isRequired,
    highlighted: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool.isRequired,
    selected: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool.isRequired,
    optionProps: (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
        tabIndex: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired,
        onMouseDown: (0, ($parcel$interopDefault($a9A1a$proptypes))).func.isRequired
    }).isRequired,
    cls: (0, ($parcel$interopDefault($a9A1a$proptypes))).func.isRequired,
    renderOption: (0, ($parcel$interopDefault($a9A1a$proptypes))).func
};
var $bdfc54d525ec4073$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $a9A1a$react.memo)($bdfc54d525ec4073$var$Option);


function $d92586316d502a7f$export$2e2bcd8739ae039(itemValue, selectedValue) {
    if (!selectedValue) return false;
    return Array.isArray(selectedValue) ? selectedValue.findIndex((item)=>item.value == itemValue.value) >= 0 : selectedValue.value == itemValue.value;
}



function $496a0c94e0f52224$var$OptionsList({ options: options , optionProps: optionProps , snapshot: snapshot , renderOption: renderOption , renderGroupHeader: renderGroupHeader , cls: cls ,  }) {
    return /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("ul", {
        className: cls("options"),
        children: options.map((o)=>{
            if (o.type === "group") return /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("li", {
                role: "none",
                className: cls("row"),
                children: /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsxs)("div", {
                    className: cls("group"),
                    children: [
                        /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("div", {
                            className: cls("group-header"),
                            children: renderGroupHeader ? renderGroupHeader(o.name) : o.name
                        }),
                        /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("ul", {
                            className: cls("options"),
                            children: /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)($496a0c94e0f52224$var$OptionsList, {
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
            return /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)((0, $bdfc54d525ec4073$export$2e2bcd8739ae039), {
                selected: (0, $d92586316d502a7f$export$2e2bcd8739ae039)(o, snapshot.option),
                highlighted: snapshot.highlighted === o.index,
                option: o,
                optionProps: optionProps,
                cls: cls,
                renderOption: renderOption
            }, o.value);
        })
    });
}
$496a0c94e0f52224$var$OptionsList.defaultProps = {
    renderGroupHeader: null,
    renderOption: null
};
$496a0c94e0f52224$var$OptionsList.propTypes = {
    options: (0, ($parcel$interopDefault($a9A1a$proptypes))).arrayOf((0, $d1a0435212973db8$export$7de5fae3688fa523)).isRequired,
    optionProps: (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({}).isRequired,
    snapshot: (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
        highlighted: (0, ($parcel$interopDefault($a9A1a$proptypes))).number.isRequired,
        option: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
            (0, $d1a0435212973db8$export$7de5fae3688fa523),
            (0, ($parcel$interopDefault($a9A1a$proptypes))).arrayOf((0, $d1a0435212973db8$export$7de5fae3688fa523))
        ])
    }).isRequired,
    cls: (0, ($parcel$interopDefault($a9A1a$proptypes))).func.isRequired,
    renderGroupHeader: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    renderOption: (0, ($parcel$interopDefault($a9A1a$proptypes))).func
};
var $496a0c94e0f52224$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $a9A1a$react.memo)($496a0c94e0f52224$var$OptionsList);


function $80d01a5fbcd3c388$var$Options({ options: options , optionProps: optionProps , snapshot: snapshot , cls: cls , renderGroupHeader: renderGroupHeader , renderOption: renderOption , emptyMessage: emptyMessage ,  }) {
    const selectRef = (0, $a9A1a$react.useRef)(null);
    const { value: value , highlighted: highlighted  } = snapshot;
    const renderEmptyMessage = (0, $a9A1a$react.useCallback)(()=>{
        if (emptyMessage === null) return null;
        return /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("li", {
            className: cls("not-found"),
            children: typeof emptyMessage === "function" ? emptyMessage() : emptyMessage
        });
    }, [
        emptyMessage,
        cls
    ]);
    (0, $a9A1a$react.useEffect)(()=>{
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
    /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("div", {
        className: cls("select"),
        ref: selectRef,
        onMouseDown: (e)=>e.preventDefault(),
        children: options.length ? /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)((0, $496a0c94e0f52224$export$2e2bcd8739ae039), {
            optionProps: optionProps,
            snapshot: snapshot,
            options: options,
            renderOption: renderOption,
            renderGroupHeader: renderGroupHeader,
            cls: cls
        }) : /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("ul", {
            className: cls("options"),
            children: renderEmptyMessage()
        })
    }));
}
$80d01a5fbcd3c388$var$Options.defaultProps = {
    renderOption: null,
    renderGroupHeader: null,
    emptyMessage: null
};
$80d01a5fbcd3c388$var$Options.propTypes = {
    options: (0, ($parcel$interopDefault($a9A1a$proptypes))).arrayOf((0, $d1a0435212973db8$export$7de5fae3688fa523)).isRequired,
    optionProps: (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
        tabIndex: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired,
        onMouseDown: (0, ($parcel$interopDefault($a9A1a$proptypes))).func.isRequired
    }).isRequired,
    snapshot: (0, ($parcel$interopDefault($a9A1a$proptypes))).shape({
        highlighted: (0, ($parcel$interopDefault($a9A1a$proptypes))).number.isRequired,
        value: (0, $d1a0435212973db8$export$4d11a2a2ed2260f1)
    }).isRequired,
    cls: (0, ($parcel$interopDefault($a9A1a$proptypes))).func.isRequired,
    renderGroupHeader: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    renderOption: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    emptyMessage: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
        (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
        (0, ($parcel$interopDefault($a9A1a$proptypes))).func, 
    ])
};
var $80d01a5fbcd3c388$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $a9A1a$react.memo)($80d01a5fbcd3c388$var$Options);



function $3f8fd1b2283f48bb$export$2e2bcd8739ae039(className) {
    return (0, $a9A1a$react.useCallback)((key)=>{
        if (typeof className === "function") return className(key);
        if (key.indexOf("container") === 0) return key.replace("container", className);
        if (key.indexOf("is-") === 0 || key.indexOf("has-") === 0) return key;
        return `${className.split(" ")[0]}__${key}`;
    }, [
        className
    ]);
}



const $fdefef8b289dc6d0$var$SelectSearch = /*#__PURE__*/ (0, $a9A1a$react.forwardRef)(({ value: defaultValue , disabled: disabled , placeholder: placeholder , multiple: multiple , search: search , autoFocus: autoFocus , autoComplete: autoComplete , options: defaultOptions , id: id , onChange: onChange , onFocus: onFocus , onBlur: onBlur , printOptions: printOptions , closeOnSelect: closeOnSelect , className: className , renderValue: renderValue , renderOption: renderOption , renderGroupHeader: renderGroupHeader , getOptions: getOptions , filterOptions: filterOptions , debounce: debounce , emptyMessage: emptyMessage ,  }, ref)=>{
    const cls = (0, $3f8fd1b2283f48bb$export$2e2bcd8739ae039)(className);
    const [snapshot, valueProps, optionProps] = (0, $4bbd6d22e42ff57c$export$2e2bcd8739ae039)({
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
    const wrapperClass = (0, $801112dfb0745bfa$export$2e2bcd8739ae039)({
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
    return /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsxs)("div", {
        ref: ref,
        className: wrapperClass,
        id: id,
        children: [
            shouldRenderValue && /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsxs)("div", {
                className: cls("value"),
                children: [
                    renderValue && renderValue(props, snapshot, cls("input")),
                    !renderValue && /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)("input", {
                        ...props,
                        className: cls("input")
                    })
                ]
            }),
            shouldRenderOptions && /*#__PURE__*/ (0, $a9A1a$reactjsxruntime.jsx)((0, $80d01a5fbcd3c388$export$2e2bcd8739ae039), {
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
$fdefef8b289dc6d0$var$SelectSearch.defaultProps = {
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
$fdefef8b289dc6d0$var$SelectSearch.propTypes = {
    // Data
    options: (0, ($parcel$interopDefault($a9A1a$proptypes))).arrayOf((0, $d1a0435212973db8$export$7de5fae3688fa523)).isRequired,
    getOptions: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    filterOptions: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    value: (0, $d1a0435212973db8$export$4d11a2a2ed2260f1),
    // Interaction
    multiple: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool,
    search: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool,
    disabled: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool,
    printOptions: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOf([
        "auto",
        "always",
        "never",
        "on-focus"
    ]),
    closeOnSelect: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool,
    debounce: (0, ($parcel$interopDefault($a9A1a$proptypes))).number,
    // Attributes
    placeholder: (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
    id: (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
    autoComplete: (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
    autoFocus: (0, ($parcel$interopDefault($a9A1a$proptypes))).bool,
    // Design
    className: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
        (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
        (0, ($parcel$interopDefault($a9A1a$proptypes))).func, 
    ]),
    // Renderers
    renderOption: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    renderGroupHeader: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    renderValue: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    emptyMessage: (0, ($parcel$interopDefault($a9A1a$proptypes))).oneOfType([
        (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
        (0, ($parcel$interopDefault($a9A1a$proptypes))).func, 
    ]),
    // Events
    onChange: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    onFocus: (0, ($parcel$interopDefault($a9A1a$proptypes))).func,
    onBlur: (0, ($parcel$interopDefault($a9A1a$proptypes))).func
};
var $fdefef8b289dc6d0$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $a9A1a$react.memo)($fdefef8b289dc6d0$var$SelectSearch);


function $b33d78a6671ffa6c$var$fuzzy(q, text) {
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
function $b33d78a6671ffa6c$var$search(item, query) {
    const name = item.name.toLowerCase();
    if ($b33d78a6671ffa6c$var$fuzzy(query, name)) return true;
    return item.groupName && $b33d78a6671ffa6c$var$fuzzy(query, item.groupName.toLowerCase());
}
function $b33d78a6671ffa6c$export$2e2bcd8739ae039(options) {
    return (query)=>{
        if (!query.length) return options;
        const q = query.toLowerCase();
        return options.filter((option)=>$b33d78a6671ffa6c$var$search(option, q));
    };
}




//# sourceMappingURL=index.js.map
