# error-stamp [![Build Status][ci-img]][ci]
Mutate a JS error object to include a stamp of current step.

[ci-img]:  https://travis-ci.org/pazams/error-stamp.svg
[ci]:      https://travis-ci.org/pazams/error-stamp

## Why 
The main motivation for this module is for using [Node.JS style callbacks](https://nodejs.org/api/errors.html#errors_node_js_style_callbacks). When passing the Error object, it contains the details of the sync call, but loses track of all async coming after. 

This module solves this issue by adding to the trace additional "stamps" when used.
For example, if before you handled errors like this:

```JS
if(err) {
    callback(err);
    return;
}   
```

Now you can get additional trace information by doing:
```JS
var stamp = require('error-stamp');

if(err) {
    stamp(err);
    callback(err);
    return;
}   
```

And since the function always return the input, there's a shorter version:
```JS
var stamp = require('error-stamp');

if(stamp(err)) {
    callback(err);
    return;
}   
```

## Before & After

### Before using the module
__node example.js__
```bash
/tmp/error-stamp/example.js:40
        throw err;
        ^

Error
    at null._onTimeout (/tmp/error-stamp/example.js:33:18)
    at Timer.listOnTimeout (timers.js:89:15)
```


### After using the module
__node example_withstamps.js__
```bash
/tmp/error-stamp/example_withstamps.js:42
        throw err;
        ^

Error
    at ErrStamp /tmp/error-stamp/example_withstamps.js:7:23
    at ErrStamp /tmp/error-stamp/example_withstamps.js:22:26
    at null._onTimeout (/tmp/error-stamp/example_withstamps.js:35:18)
    at Timer.listOnTimeout (timers.js:89:15)
```

## API


### errorStamp(err) 

Mutate an Error object to include a stamp of current step.

**Parameters**

**err**: `Error`, an object that inherits from Error.prototype


### errorStamp.setErrorPrefix(value) 

Sets the error prefix used in each new line added to the trace. Default is "ErrStamp"

**Parameters**

**value**: `string`, the value to set


## Alternatives
Some other module tackle the same issue, among them:
- [longjohn](https://github.com/mattinsler/longjohn) does the job, but as it has recommended- not intended on production environment (note it interferes with every asyc execution).
- [async-stacktrace](https://github.com/Pita/async-stacktrace) has greatly inspired this module, but it does more just adding trace stamps (throw errors, call callbacks and conditionally create Error objects).

## Notes
This module can also be used when handling errors with promises.

