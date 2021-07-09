export default function classes(classNames) {
  return Object.entries(classNames).filter(([cls, display]) => cls && display).map(([cls]) => cls).join(' ');
}