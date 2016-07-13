var errorPrefix = "ErrStamp";

/**
 * Mutate an Error object to include a stamp of current step.
 * @param {Error} err an object that inherits from Error.prototype
 */
function errorStamp(err)
{

    //if there is an error object, "push" to its stack the current trace
    if(err instanceof Error) {

        var stackLines = err.stack.split("\n");

        var currentTrace = new Error().stack.split("\n")[2];

        var newStackLine = errorPrefix ? currentTrace.replace('at', 'at '+errorPrefix) : currentTrace;

        stackLines.splice(1,0,newStackLine);

        err.stack = stackLines.join("\n");
    }

    //return the (modified?) input.
    return err;
}


/**
 * Sets the error prefix used in each new line added to the trace. Default is "ErrStamp"
 * @param {string} value the value to set
 */
errorStamp.setErrorPrefix = function(value){
    errorPrefix = value;
};

module.exports = errorStamp;
