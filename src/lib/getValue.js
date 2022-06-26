import isOption from './isOption';

export default function getValue(option) {
    return isOption(option) ? option.value : null;
}
