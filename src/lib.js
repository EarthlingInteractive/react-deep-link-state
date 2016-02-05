import _      from 'lodash';
import update from 'react-addons-update';

export function getValueFromState(statePath, options) {
    return getValueFromObject(statePath, options, this.state);
}
    
export function getValueFromObject(statePath, options, valueObject) {

    var config = this.constructor.deepLinkeConfig;

    options = _.defaults({}, options, config, {
        storeEmptyStringAsNull: false
    });
    
    var value = valueObject;
    
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

export function onChange(statePath, options, callback, value) {

    var partialState     = updateValueObject(statePath, options, this.state, value),
        callbackIsSetted = typeof callback == "function";

    this.setState(partialState, () => {
        
        if (callbackIsSetted) {
            callback.call(this, value);
        }
    });
}

export function updateValueObject(statePath, options, valueObject, value) {

    var config = this.constructor.deepLinkeConfig;

    options = _.defaults({}, options, config, {
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
    
    return update(valueObject, updaterObject);
}