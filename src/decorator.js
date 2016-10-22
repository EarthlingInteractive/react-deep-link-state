import { linkState, valueLinkToState, checkedLinkToState } from './lib';

export default function decorator(target) {
	Object.defineProperty(target.prototype, 'linkState',          linkState);
	Object.defineProperty(target.prototype, 'valueLinkToState',   valueLinkToState);
	Object.defineProperty(target.prototype, 'checkedLinkToState', checkedLinkToState);
};
