export default function cancelablePromise(promise) {
    let hasCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((...args) => (
            hasCanceled ? reject(new Error('canceled')) : resolve(...args)
        )).catch(error => (
            hasCanceled ? reject(new Error('canceled')) : reject(error)
        ));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled = true;
        },
    };
}
