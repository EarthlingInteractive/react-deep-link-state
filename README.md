[![NPM](https://nodei.co/npm/react-deep-link.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-deep-link/)

# react-deep-link
A React mixin for linking form fields to a deep structure of data within the component's state.

# Description

This mixin is a substitute for the standard React mixin React.addons.LinkedStateMixin. While the standard mixin only allows you to link a form field to a key directly within the component's state, this mixin allows you to link a form field to a key deeper in the component's state object.

# Getting Started

To install from npm, run:

`npm install --save react-deep-link`

Then include the mixin in the component that will use it:

```js
import DeepLinkMixin from 'react-deep-link';

...

var MyComponent = React.createClass({
	mixins: [DeepLinkMixin],
	
	...
});
```

or

```js
import DeepLinkDecorator from 'react-deep-link/lib/decorator';

...

@DeepLinkDecorator
class MyComponent extends React.Component {
	...
}
```

# Usage Examples #

Link a text field to `this.state.data.user.name`:
```jsx
<input type="text" valueLink={this.linkState('data.user.name')} />
```

In React v15 `valueLink` is deprecated "due to very low popularity", because of this there are other variant of usage:
```jsx
<input type="text"     {...this.valueLinkToState('data.user.name')} />
<input type="checkbox" {...this.checkedLinkToState('data.user.onDiet')} />
```

Link a text field to `this.state.data.user.name`, translating an empty string in the text field to null in the state and vice-versa:
```jsx
<input type="text" valueLink={this.linkState('data.user.name', {storeEmptyStringAsNull: true})} />
```

In both cases above you can add callback:
```jsx
<input type="text" valueLink={this.linkState('data.user.name', (newVale) => {...})} />
<input type="text" valueLink={this.linkState('data.user.name', {storeEmptyStringAsNull: true}, (newVale) => {...})} />
```

In options you can set `mutator` function:
```jsx
<input type="text" {...this.valueLinkToState('data.user.name', {mutator: _ => _.toUpperCase()})} />
```

Also you can define global configs:
```js
MyComponent.deepLinkConfig = {
	storeEmptyStringAsNull: true
};
// or
class MyComponent extends React.Component {
	
	static deepLinkConfig = {
		storeEmptyStringAsNull: true
	};

	...
}
```


