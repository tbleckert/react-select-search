// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js';
export default function fuzzySearch(options) {
  const fuse = new Fuse(options, {
    keys: ['name', 'groupName', 'items.name'],
    threshold: 0.3
  });
  return value => {
    if (!value.length) {
      return options;
    }

    return fuse.search(value);
  };
}