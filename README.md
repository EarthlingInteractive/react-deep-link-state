[![NPM](https://nodei.co/npm/react-deep-link-state.png?compact=true)](https://nodei.co/npm/react-deep-link-state/)

# react-deep-link-state
A React mixin for linking form fields to a deep structure of data within the component's state.

# Description #

This mixin is a substitute for the standard React mixin React.addons.LinkedStateMixin.  While the standard mixin only allows you to link a form field to a key directly within the component's state, this mixin allows you to link a form field to a key deeper in the component's state object.

# Getting Started#

To install from npm, run:

```npm install --save react-deep-link-state```

Then include the mixin in the component that will use it:

```
var DeepLinkedStateMixin = require('react-deep-link-state');

...

var MyComponent = React.createClass({
	mixins: [DeepLinkedStateMixin],
	
	...
});
```

# Usage Examples #

Link a text field to ```this.state.data.user.name```:
```
<input type="text" valueLink={this.deepLinkState(['data', 'user', 'name'])} />
```

Link a text field to ```this.state.data.user.name```, translating an empty string in the text field to null in the state and vice-versa:
```
<input type="text" valueLink={this.deepLinkState(['data', 'user', 'name'], {storeEmptyStringAsNull: true})} />
```
