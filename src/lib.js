import update   from 'react-addons-update';
import isObject from 'lodash/isObject';
import defaults from 'lodash/defaults';
import every    from 'lodash/every';

/**
 * Link value to state.
 * 
 * @param  {String}   statePath
 * @param  {Object}   options
 * @param  {Function} callback
 * @return {Object}
 */
export function linkState(_statePath, _options, _callback) {

	let statePath = _statePath,
		options   = _options,
		callback  = _callback;
	
	if (typeof statePath == 'string') {
		statePath = statePath.split(/[\.\[\]]/g);
	}
	
	if (typeof options == 'function') {
		callback = options;
		options  = false;
	}

	return {
		value:         getValueFromState(  this, statePath, options ),
		requestChange: requestChange.bind( this, statePath, options, callback )
	};
}

/**
 * Link input value to state.
 * 
 * @param  {String}   statePath
 * @param  {Object}   options
 * @param  {Function} callback
 * @return {Object}
 */
export function valueLinkToState(_statePath, _options, _callback) {

	let statePath = _statePath,
		options   = _options,
		callback  = _callback;
	
	if (typeof statePath == 'string') {
		statePath = statePath.split(/[\.\[\]]/g);
	}
	
	if (typeof options == 'function') {
		callback = options;
		options  = false;
	}

	return {
		value:         getValueFromState(  this, statePath, options ),
		requestChange: requestChange.bind( this, statePath, options, callback ),
		onChange:      onChange.bind(      this, statePath, options, callback )
	};
}

/**
 * Link checkbox value to state.
 * 
 * @param  {String}   statePath
 * @param  {Object}   options
 * @param  {Function} callback
 * @return {Object}
 */
export function checkedLinkToState(_statePath, _options, _callback) {

	let statePath = _statePath,
		options   = _options,
		callback  = _callback;
	
	if (typeof statePath == 'string') {
		statePath = statePath.split(/[\.\[\]]/g);
	}
	
	if (typeof options == 'function') {
		callback = options;
		options  = false;
	}

	return {
		checked:       getValueFromState(  this, statePath, options ),
		requestChange: requestChange.bind( this, statePath, options, callback ),
		onChange:      onChange.bind(      this, statePath, options, callback )
	};
}

/**
 * Request change function for `valueLink` property.
 * 
 * @param  {Array}    path to property
 * @param  {Object}   options
 * @param  {Function} callback
 * @param  {Object}   new value
 */
function requestChange(statePath, _options, callback, value) {

	const options = defaults({}, _options, this.constructor.deepLinkeConfig, {
			storeEmptyStringAsNull: false
		}),
		{ mutator } = options;

	if (typeof mutator == 'function') {
		value = mutator(value);
	}

	const newState = setValueToState(this, statePath, options, value);

	this.setState(newState, () => {
		
		if (typeof callback == 'function') {
			callback.call(this, value);
		}
	});
}

/**
 * On change function for usage without `valueLink` property. (React v15)
 * 
 * @param  {Array}    path to property
 * @param  {Object}   options
 * @param  {Function} callback
 * @param  {Object}   DOM onChange event object
 */
function onChange(statePath, _options, callback, event) {

	let { type, value, checked } = event.target;

	if (type == 'checkbox' || type == 'radio') {
		value = checked;
	}

	const options = defaults({}, _options, this.constructor.deepLinkeConfig, {
			storeEmptyStringAsNull: false
		}),
		{ mutator } = options;

	if (typeof mutator == 'function') {
		value = mutator(value);
	}

	const newState = setValueToState(this, statePath, options, value);

	this.setState(newState, () => {
		
		if (typeof callback == 'function') {
			callback.call(this, value);
		}
	});
}

/**
 * Get value from state of component.
 * 
 * @param  {Object} react component context
 * @param  {Array}  path to property
 * @param  {Object} options
 * @return {Object}
 */
function getValueFromState(context, statePath, _options) {

	let value = context.state;

	const options = defaults({}, _options, context.constructor.deepLinkeConfig, {
		storeEmptyStringAsNull: false
	});
	
	const havePath = every(statePath, (statePathPart) => {

		if (!isObject(value) || !value.hasOwnProperty(statePathPart)) {
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
}

/**
 * Set value to state of component.
 * 
 * @param  {Object} react component context
 * @param  {Array}  path to property
 * @param  {Object} options
 * @param  {Object} new value
 * @return {Object}
 */
function setValueToState(context, statePath, options, value) {
	
	if (options.storeEmptyStringAsNull) {

		if (value === '') {
			value = null;
		}
	}

	const updaterObject = {},
		statePathLastIndex = statePath.length - 1;

	let updaterLastOp = updaterObject;

	statePath.forEach((part, i) => {

		updaterLastOp = updaterLastOp[part] = {};

		if (i == statePathLastIndex) {
			updaterLastOp.$set = value;
		}
	});
	
	return update(context.state, updaterObject);
}