'use strict';

var _ = require('lodash');

var React = require('react');
var ReactLink = require('react/lib/ReactLink');

function deepLinkStateValue(statePath, options) {
    var value = this.state;
    
    var havePath = _.all(statePath, function(statePathPart) {
        if (!_.isObject(value) || !value.hasOwnProperty(statePathPart)) {
            return false;
        }
        
        value = value[statePathPart];
        
        return true;
    }, this);
    
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

function deepLinkStateOnChange(statePath, options, value) {
    var statePathDepth = [].concat(statePath);
    var statePathLast = statePathDepth.pop();
    
    var partialState = _.pick(this.state, statePathDepth[0]);
    var stateSub = partialState;
    
    _.each(statePathDepth, function(statePathPart) {
        stateSub[statePathPart] = _.extend({}, stateSub[statePathPart]);
        
        stateSub = stateSub[statePathPart];
    }, this);
    
    if (options.storeEmptyStringAsNull) {
        if (value === '') {
            value = null;
        }
    }
    
    stateSub[statePathLast] = value;
    
    this.setState(partialState);
}

var DeepLinkStateMixin = {
    deepLinkState: function(statePath, options) {
        options = options || {};
        
        return new ReactLink(
            deepLinkStateValue.call(this, statePath, options),
            deepLinkStateOnChange.bind(this, statePath, options)
        );
    }
};

module.exports = DeepLinkStateMixin;
