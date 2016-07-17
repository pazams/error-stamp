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

