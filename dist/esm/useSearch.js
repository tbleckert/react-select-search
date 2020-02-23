function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useMemo, useCallback, useState } from 'react';
import doSearch from './search';
import FlattenOptions from './lib/FlattenOptions';
export default function useSearch(defaultOptions, snapshot) {
  var fuse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    keys: ['name', 'groupName'],
    threshold: 0.3
  };
  var flatOptions = useMemo(function () {
    return FlattenOptions(defaultOptions);
  }, [defaultOptions]);

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      search = _useState2[0],
      setSearch = _useState2[1];

  var _useState3 = useState(flatOptions),
      _useState4 = _slicedToArray(_useState3, 2),
      options = _useState4[0],
      setOptions = _useState4[1];

  var onBlur = useCallback(function () {
    setOptions(defaultOptions);
    setSearch('');
  }, [defaultOptions]);
  var onSearch = useCallback(function (e) {
    var value = e.target.value;
    setSearch(value);

    if (value.length) {
      var newOptions = doSearch(value, flatOptions, fuse);

      if (newOptions) {
        setOptions(newOptions);
      }
    } else {
      setOptions(flatOptions);
    }
  }, [flatOptions, fuse]);
  var searchProps = {
    onBlur: onBlur,
    onChange: onSearch,
    value: search
  };
  return [searchProps, options];
}