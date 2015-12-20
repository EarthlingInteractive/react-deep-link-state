'use strict';

var ReactLink = require('react/lib/ReactLink');

var DeepLinkedStateLib = require('./DeepLinkedStateLib');

var DeepLinkedStateMixin = {
    deepLinkState: function(statePath, options, callback) {
        
        if (typeof statePath == "string") {
            statePath = statePath.split(/[\.\[\]]/g);
        }
        
        if (typeof options == "function") {
            callback = options;
            options = false;
        }
        
        return new ReactLink(
            DeepLinkedStateLib.getValueFromState.call(this, statePath, options),
            DeepLinkedStateLib.onChange.bind(this, statePath, options, callback)
        );
    }
};

module.exports = DeepLinkedStateMixin;
