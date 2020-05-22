export default function getOption(value, defaultOptions) {
    if (value) {
        if (Array.isArray(value)) {
            return value
                .map((singleValue) => (
                    defaultOptions.find((option) => option.value === singleValue)
                ));
        }

        return defaultOptions.find((option) => option.value === value) || null;
    }

    return null;
}
