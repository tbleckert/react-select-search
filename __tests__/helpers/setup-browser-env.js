import browserEnv from 'browser-env';
browserEnv(['window', 'document', 'navigator']);

global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};
