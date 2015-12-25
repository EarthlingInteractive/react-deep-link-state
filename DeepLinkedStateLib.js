'use strict';

var _ = require('lodash');
var update = require('react-addons-update');

var DeepLinkedStateLib = {
    getValueFromState: function(statePath, options) {
        return DeepLinkedStateLib.getValueFromObject(statePath, options, this.state);
    },
    
    getValueFromObject: function(statePath, options, valueObject) {
        options = options || {};
        
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

    onChange: function(isDefaults, statePath, options, callback, value) {

        var config = this.constructor.deepLinkeStateConfig, 
            partialState = DeepLinkedStateLib.updateValueObject(statePath, options, value, this.state),
            callbackIsSetted = typeof callback == "function";

        if (typeof config != "undefined" && config.silent) {

            this.state = partialState;
            
            if (callbackIsSetted) {
                callback(value, isDefaults);
            }

            return;
        }

        this.setState(partialState, function() {
            
            if (callbackIsSetted) {
                callback(value, isDefaults);
            }
        });
    },

    updateValueObject: function(statePath, options, value, valueObject) {
        options = options || {};
        
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
