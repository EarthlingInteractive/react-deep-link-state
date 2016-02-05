[![NPM](https://nodei.co/npm/react-deep-link.png?compact=true)](https://nodei.co/npm/react-deep-link/)

# react-deep-link
A React mixin for linking form fields to a deep structure of data within the component's state.

# Description

This mixin is a substitute for the standard React mixin React.addons.LinkedStateMixin. While the standard mixin only allows you to link a form field to a key directly within the component's state, this mixin allows you to link a form field to a key deeper in the component's state object.

# Getting Started

To install from npm, run:

```npm install --save react-deep-link```

Then include the mixin in the component that will use it:

```js
import DeepLinkMixin from 'react-deep-link';

...

var MyComponent = React.createClass({
	mixins: [DeepLinkMixin],
	
	...
});
```

# Usage Examples #

Link a text field to ```this.state.data.user.name```:
```jsx
<input type="text" valueLink={this.linkState('data.user.name')} />
```

Link a text field to ```this.state.data.user.name```, translating an empty string in the text field to null in the state and vice-versa:
```jsx
<input type="text" valueLink={this.linkState('data.user.name', {storeEmptyStringAsNull: true})} />
```

In both cases above you can add callback:
```jsx
<input type="text" valueLink={this.linkState('data.user.name', (newVale) => {...})} />
<input type="text" valueLink={this.linkState('data.user.name', {storeEmptyStringAsNull: true}, (newVale) => {...})} />
```

Also you can define global configs:
```js
MyComponent.deepLinkConfig = {
	storeEmptyStringAsNull: true
};
```


