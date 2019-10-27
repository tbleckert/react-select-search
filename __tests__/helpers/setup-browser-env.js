import browserEnv from 'browser-env';
browserEnv(['window', 'document', 'navigator']);

global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

const scrollIntoViewMock = jest.fn();
global.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
