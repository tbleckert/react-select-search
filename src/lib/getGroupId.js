export default function getGroupId(group) {
    return `${group.name}-${Math.random().toString(36).substr(2, 9)}`;
}
