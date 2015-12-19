'use strict';

var ReactLink = require('react/lib/ReactLink');

var DeepLinkedStateLib = require('./DeepLinkedStateLib');

var DeepLinkedStateMixin = {
    deepLinkState: function(statePath, options, callback) {
        return new ReactLink(
            DeepLinkedStateLib.getValueFromState.call(this, statePath, options, callback),
            DeepLinkedStateLib.onChange.bind(this, statePath, options, callback)
        );
    }
};

module.exports = DeepLinkedStateMixin;
