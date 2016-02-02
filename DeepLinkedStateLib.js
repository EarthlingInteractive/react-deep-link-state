'use strict';

var _ = require('lodash');
var update = require('react-addons-update');

var DeepLinkedStateLib = {
    getValueFromState: function(statePath, options) {
        return DeepLinkedStateLib.getValueFromObject(statePath, options, this.state);
    },
    
    getValueFromObject: function(statePath, options, valueObject) {

        var config = this.constructor.deepLinkeStateConfig;

        options = _.defaults({}, options, config, {
            silent: false
        });
        
        var value = valueObject;
        
        var havePath = _.all(statePath, function(statePathPart) {
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
    },

    onChange: function(statePath, options, callback, value) {

        var config = this.constructor.deepLinkeStateConfig, 
            partialState = DeepLinkedStateLib.updateValueObject(statePath, options, value, this.state),
            callbackIsSetted = typeof callback == "function";

        options = _.defaults({}, options, config, {
            silent: false
        });

        if (options.silent) {
            
            this.state = partialState;
            
            if (callbackIsSetted) {
                callback(value);
            }

            return;
        }

        this.setState(partialState, function() {
            
            if (callbackIsSetted) {
                callback(value);
            }
        });
    },

    updateValueObject: function(statePath, options, value, valueObject) {

        var config = this.constructor.deepLinkeStateConfig;

        options = _.defaults({}, options, config, {
            silent: false
        });
        
        if (options.storeEmptyStringAsNull) {

            if (value === '') {
                value = null;
            }
        }

        var updaterObject = {},
            updaterLastOp = updaterObject,
            statePathLastIndex = statePath.length - 1;

        statePath.forEach(function(part, i) {

            updaterLastOp = updaterLastOp[part] = {};

            if (i == statePathLastIndex) {
                updaterLastOp.$set = value;
            }
        });
        
        return update(valueObject, updaterObject);
    }
};

module.exports = DeepLinkedStateLib;
