wrapPromise = function(promise, context) {
  var Future = Npm.require('fibers/future');

  var future = new Future();

  promise.then(function(res) {
    future.return(res);
  }, function(err) {
    future.throw(err);
  });

  return future.wait();
}