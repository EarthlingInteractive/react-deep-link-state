import ReactLink from 'react/lib/ReactLink';
import _         from 'lodash';
import update    from 'react-addons-update';

export default class Link extends ReactLink {

    constructor(context, _statePath, _options, _callback) {

        var statePath = _statePath,
            options   = _options,
            callback  = _callback;
        
        if (typeof statePath == "string") {
            statePath = statePath.split(/[\.\[\]]/g);
        }
        
        if (typeof options == "function") {
            callback = options;
            options  = false;
        }

        super(
            getValueFromState(context, statePath, options), 
            requestChange.bind(context, statePath, options, callback)
        );

        this.onChange = onChange.bind(context, statePath, options, callback);
    }
}

/**
 * Request change function for `valueLink` property.
 * 
 * @param  {Array}    path to property
 * @param  {Object}   options
 * @param  {Function} callback
 * @param  {Object}   new value
 */
function requestChange(statePath, options, callback, value) {

    var newState         = setValueToState(this, statePath, options, value),
        callbackIsSetted = typeof callback == "function";

    this.setState(newState, () => {
        
        if (callbackIsSetted) {
            callback.call(this, value);
        }
    });
}

/**
 * On change function for usage without `valueLink` property. (React v15)
 * 
 * @param  {Array}    path to property
 * @param  {Object}   options
 * @param  {Function} callback
 * @param  {Object}   DOM onChange event object
 */
function onChange(statePath, options, callback, event) {

    var { type, value, checked } = event.target;

    if (type == "checkbox" || type == "radio") {
        value = checked;
    }

    var newState         = setValueToState(this, statePath, options, value),
        callbackIsSetted = typeof callback == "function";

    this.setState(newState, () => {
        
        if (callbackIsSetted) {
            callback.call(this, value);
        }
    });
}

/**
 * Get value from state of component.
 * 
 * @param  {Object} react component context
 * @param  {Array}  path to property
 * @param  {Object} options
 * @return {Object}
 */
function getValueFromState(context, statePath, _options) {

    var value   = context.state,
        options = _.defaults({}, _options, context.constructor.deepLinkeConfig, {
            storeEmptyStringAsNull: false
        });
    
    var havePath = _.all(statePath, (statePathPart) => {

        if (!_.isObject(value) || !value.hasOwnProperty(statePathPart)) {
            return false;
        }
        
        value = value[statePathPart];
        
        return true;
    });
    
    if (!havePath) {
        value = null;
    }
    
    if (options.storeEmptyStringAsNull) {

        if (value === null) {
            value = '';
        }
    }
    
    return value;
}

/**
 * Set value to state of component.
 * 
 * @param  {Object} react component context
 * @param  {Array}  path to property
 * @param  {Object} options
 * @param  {Object} new value
 * @return {Object}
 */
function setValueToState(context, statePath, _options, value) {

    var options = _.defaults({}, _options, context.constructor.deepLinkeConfig, {
        storeEmptyStringAsNull: false
    });
    
    if (options.storeEmptyStringAsNull) {

        if (value === '') {
            value = null;
        }
    }

    var updaterObject = {},
        updaterLastOp = updaterObject,
        statePathLastIndex = statePath.length - 1;

    statePath.forEach((part, i) => {

        updaterLastOp = updaterLastOp[part] = {};

        if (i == statePathLastIndex) {
            updaterLastOp.$set = value;
        }
    });
    
    return update(context.state, updaterObject);
}