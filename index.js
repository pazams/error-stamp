var errorPrefix = "ErrStamp";

/**
 * Mutate an Error object to include a stamp of current step.
 * @param {Error} err An object that inherits from Error.prototype .
 * @param {string} [msg] Optional. A message to add with the stamp.
 */
function errorStamp(err, msg)
{

    //if there is an error object, "push" to its stack the current trace
    if(err instanceof Error) {

        var stackLines = err.stack.split("\n");

        var currentTrace = new Error().stack.split("\n")[2];

        var currentTraceMessage = msg ? currentTrace.replace('at', 'at '+msg) : currentTrace;

        var newStackLine = errorPrefix ? currentTraceMessage.replace('at', 'at '+errorPrefix) : currentTraceMessage;

        stackLines.splice(1,0,newStackLine);

        err.stack = stackLines.join("\n");
    }

    //return the (modified?) input.
    return err;
}


/**
 * Sets the error prefix used in each new line added to the trace. Default is "ErrStamp"
 * @param {string} value The value to set
 */
errorStamp.setErrorPrefix = function(value){
    errorPrefix = value;
};

module.exports = errorStamp;
