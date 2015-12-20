'use strict';

var ReactLink = require('react/lib/ReactLink');

var DeepLinkedStateLib = require('./DeepLinkedStateLib');

var DeepLinkedStateMixin = {
    linkState: function(statePath, options, callback) {
        
        if (typeof statePath == "string") {
            statePath = statePath.split(/[\.\[\]]/g);
        }
        
        var options_type = typeof options;
        
        if (options_type == "function" || options_type == "string") {
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
