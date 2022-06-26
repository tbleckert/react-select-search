export default function isOption(option) {
    return option && typeof option === 'object' && 'value' in option && 'name' in option;
}
