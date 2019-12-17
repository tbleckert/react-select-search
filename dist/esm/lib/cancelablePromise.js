export default function cancelablePromise(promise) {
  var hasCanceled = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function () {
      return hasCanceled ? reject(new Error('canceled')) : resolve.apply(void 0, arguments);
    }).catch(function (error) {
      return hasCanceled ? reject(new Error('canceled')) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled = true;
    }
  };
}