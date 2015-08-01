## Installation

`meteor add east5th:wrap-promise`

## The Problem

When you're working with Promises in Meteor, there is no way to return a synchronous result without introducting Fibers or Futures. The results can feel clunky:

```
function returnsPromise() {
  var Promise = Meteor.npmRequire('es6-promise').Promise;

  return new Promise(function(resolve, reject) {
    var num = Math.random() * 2;
    setTimeout(function() {
      if (num > 1.0) {
        resolve(num);
      }
      else {
        reject(num);
      }
    }, num * 1000);
  });
}

Meteor.methods({
  syncPromiseResults: function() {
    var Future = Npm.require('fibers/future');
    var future = new Future();

    returnsPromise().then(function(res) {
      future.return(res);
    }, function(err) {
      future.throw(err);
    });

    return future.wait();
  }
});
```

Unfortunately, we can't use `wrapAsync` here, because `wrapAsync` is designed for asynchronous functions that accept an error-first callback as their last argument.

This package exposes a `wrapPromise` utility method that acts exactly like `wrapAsync`, but for Promises!

## The Solution

Add `east5th:wrap-promise` add refactor your syncPromiseResults method to look like this:

```
Meteor.methods({
  syncPromiseResults: function() {
    return wrapPromise(returnsPromise());
  }
});
```

That's it!
