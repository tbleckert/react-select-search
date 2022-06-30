export default function getValue(option) {
    if (!option) return null;

    if (Array.isArray(option)) {
        return option.filter(Boolean).map((o) => o.value);
    }

    return option.value || null;
}
