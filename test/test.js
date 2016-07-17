var assert = require('assert');
var stamp = require('..');

describe('error-stamp', function() {

    describe('default values', function() {

        it('defaults to "ErrStamp" as an error prefix', function() {

            var err = new Error();

            stamp(err);

            var customTraceIndex = err.stack.split("\n")[1].indexOf('ErrStamp');

            assert.notEqual(customTraceIndex, -1);

        });

    });

    describe('functionality', function() {

        beforeEach(function() {

            stamp.setErrorPrefix('');

        });

        it('adds current step to trace', function() {

            var err = new Error();                                // 0
            var currentTrace = err.stack.split("\n")[1];          // 1 
            var currentTrace_split= currentTrace.split(':');      // 2

            stamp(err);                                             // 4
            var addedTrace = err.stack.split("\n")[1];
            var addedTrace_split = addedTrace.split(':');

            assert.equal(currentTrace_split[0], addedTrace_split[0]);
            assert.equal(currentTrace_split[1] - addedTrace_split[1], -4); // "stamp(err)" is 4 lines below "new Error()"

        });

        it('always returns the input value or reference- i.e an identity function', function() {

            var possibleInputs = [1,"2",true,null,undefined,{}];

            possibleInputs.forEach(function(input){
                assert.equal(input, stamp(input));
            });

        });

        it('it mutates the input error object- i.e it has side effects', function(){

            var err = new Error();

            assert.equal(err, stamp(err));

        });

        it('adds one trace line to the error stack', function() {

            var err = new Error();

            var stackLinesBefore = err.stack.split("\n").length;

            stamp(err);

            var stackLinesAfter = err.stack.split("\n").length;

            assert.equal(stackLinesBefore+1, stackLinesAfter);

        });

        it('adds the optional message', function() {

            stamp.setErrorPrefix('foo');

            var err = new Error();

            stamp(err,'bookApiFacade');

            var customMessageIndex = err.stack.split("\n")[1].indexOf('bookApiFacade');

            assert.notEqual(customMessageIndex, -1);

        });

        it('operates on Error types that inherit from Error prototype', function() {

            var err = new RangeError();

            var stackLinesBefore = err.stack.split("\n").length;

            stamp(err);

            var stackLinesAfter = err.stack.split("\n").length;

            assert.equal(stackLinesBefore+1, stackLinesAfter);

        });

        it('allows to set the error prefix', function() {

            stamp.setErrorPrefix('foo');

            var err = new Error();

            stamp(err);

            var customTraceIndex = err.stack.split("\n")[1].indexOf('foo');

            assert.notEqual(customTraceIndex, -1);

        });

        it('does not alter the trace string if setErrorPrefix() is passed a falsey value', function() {

            stamp.setErrorPrefix(false);

            var err = new Error();                                // 0
            var currentTrace = err.stack.split("\n")[1];          // 1 
            var currentTrace_split= currentTrace.split(':');      // 2

            stamp(err);                                             // 4
            var addedTrace = err.stack.split("\n")[1];
            var addedTrace_split = addedTrace.split(':');

            assert.equal(currentTrace_split[0], addedTrace_split[0]);
            assert.equal(currentTrace_split[1] - addedTrace_split[1], -4); // "stamp(err)" is 4 lines below "new Error()"
        });

        it('adds the error prefix while keeping same indentations of lines ', function() {

            stamp.setErrorPrefix('foo');

            var err = new Error();

            var regularTraceIndex = err.stack.split("\n")[1].indexOf('at');

            stamp(err);

            var customTraceIndex = err.stack.split("\n")[1].indexOf('at');

            assert.equal(regularTraceIndex, customTraceIndex);

        });

    });


});
