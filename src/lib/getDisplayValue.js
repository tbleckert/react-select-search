import getOption from './getOption';

export default function getDisplayValue(value, defaultOptions) {
    const option = getOption(value, defaultOptions);

    if (option) {
        if (Array.isArray(option)) {
            return option.map(singleOption => singleOption.name).join(', ');
        }

        return option.name;
    }

    return '';
}
