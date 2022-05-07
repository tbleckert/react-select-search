export default function classes(classNames) {
  return Object.entries(classNames).filter(_ref => {
    let [cls, display] = _ref;
    return cls && display;
  }).map(_ref2 => {
    let [cls] = _ref2;
    return cls;
  }).join(' ');
}