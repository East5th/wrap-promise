wrapPromise = function(promise, context) {
  if (!promise || !_.isFunction(promise.then)) {
    return promise;
  }

  var Future = Npm.require('fibers/future');
  var future = new Future();

  promise.then(function(res) {
    future.return(res);
  }, function(err) {
    future.throw(err);
  });

  return future.wait();
};
