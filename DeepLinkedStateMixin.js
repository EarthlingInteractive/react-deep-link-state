'use strict';

var ReactLink = require('react/lib/ReactLink');

var DeepLinkedStateLib = require('./DeepLinkedStateLib');

var DeepLinkedStateMixin = {
    deepLinkState: function(statePath, options) {
        return new ReactLink(
            DeepLinkedStateLib.getValueFromState.call(this, statePath, options),
            DeepLinkedStateLib.onChange.bind(this, statePath, options)
        );
    }
};

module.exports = DeepLinkedStateMixin;
