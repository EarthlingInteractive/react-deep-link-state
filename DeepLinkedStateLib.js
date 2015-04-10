'use strict';

var _ = require('lodash');

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

    onChange: function(statePath, options, value) {
        var partialState = DeepLinkedStateLib.updateValueObject(statePath, options, value, this.state);
        
        this.setState(partialState);
    },

    updateValueObject: function(statePath, options, value, valueObject) {
        options = options || {};
        
        var statePathDepth = [].concat(statePath);
        var statePathLast = statePathDepth.pop();
        
        var partialState = _.pick(valueObject, statePathDepth[0]);
        var stateSub = partialState;
        
        _.each(statePathDepth, function(statePathPart) {
            stateSub[statePathPart] = _.extend({}, stateSub[statePathPart]);
            
            stateSub = stateSub[statePathPart];
        });
        
        if (options.storeEmptyStringAsNull) {
            if (value === '') {
                value = null;
            }
        }
        
        stateSub[statePathLast] = value;
        
        return partialState;
    }
};

module.exports = DeepLinkedStateLib;
