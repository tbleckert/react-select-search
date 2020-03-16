export default function getGroupId(group) {
  return "".concat(group.name, "-").concat(Math.random().toString(36).substr(2, 9));
}