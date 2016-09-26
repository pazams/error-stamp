# error-stamp
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Mutate a JS error object to include a stamp of current step.

[travis-image]: https://img.shields.io/travis/pazams/error-stamp.svg?style=flat-square
[travis-url]: https://travis-ci.org/pazams/error-stamp
[coveralls-image]: https://img.shields.io/coveralls/pazams/error-stamp.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/pazams/error-stamp
[downloads-image]: https://img.shields.io/npm/dm/error-stamp.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/error-stamp


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

if(err) {
    callback(stamp(err));
    return;
}   
```

## Before & After

### Before using the module
`node examples/example.js`
```bash
/tmp/error-stamp/examples/example.js:42
        throw err;
        ^

Error
    at null._onTimeout (/tmp/error-stamp/examples/example.js:35:18)
    at Timer.listOnTimeout (timers.js:89:15)
```


### After using the module
`node examples/example_withstamps.js`
```bash
/tmp/error-stamp/examples/example_withstamps.js:42
        throw err;
        ^

Error
    at ErrStamp /tmp/error-stamp/examples/example_withstamps.js:8:33
    at ErrStamp /tmp/error-stamp/examples/example_withstamps.js:23:36
    at null._onTimeout (/tmp/error-stamp/examples/example_withstamps.js:35:18)
    at Timer.listOnTimeout (timers.js:89:15)
```

## API
<a name="errorStamp"></a>

## errorStamp(err, [msg])
Mutate an Error object to include a stamp of current step.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | An object that inherits from Error.prototype . |
| [msg] | <code>string</code> | Optional. A message to add with the stamp. |

<a name="errorStamp.setErrorPrefix"></a>

### errorStamp.setErrorPrefix(value)
Sets the error prefix used in each new line added to the trace. Default is "ErrStamp"

**Kind**: static method of <code>[errorStamp](#errorStamp)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to set |


## Alternatives
Some other module tackle the same issue, among them:
- [longjohn](https://github.com/mattinsler/longjohn) does the job, but as it has recommended- not intended on production environment (note it interferes with every asyc execution).
- [async-stacktrace](https://github.com/Pita/async-stacktrace) has greatly inspired this module, but it does more than just adding trace stamps (throw errors, call callbacks and conditionally create Error objects).

## Notes
This module can also be used when handling errors with promises.

