'use strict';

var ReactLink = require('react/lib/ReactLink');

var DeepLinkedStateLib = require('./DeepLinkedStateLib');

var DeepLinkedStateMixin = {
    linkState: function(statePath, options, callback) {
        
        if (typeof statePath == "string") {
            statePath = statePath.split(/[\.\[\]]/g);
        }
        
        if (typeof options == "function") {
            callback = options;
            options = false;
        }
        
        var link = new ReactLink(
            DeepLinkedStateLib.getValueFromState.call(this, statePath, options),
            DeepLinkedStateLib.onChange.bind(this, false, statePath, options, callback)
        );

        link.requestDefaults = DeepLinkedStateLib.onChange.bind(this, true, statePath, options, callback);

        return link;
    }
};

module.exports = DeepLinkedStateMixin;
