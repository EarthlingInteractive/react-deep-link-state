import Link from './lib';

export default function decorator(target) {

    Object.defineProperty(target.prototype, 'linkState', {
        value(statePath, options, callback) {
            return new Link(this, statePath, options, callback);
        }
    });
};
