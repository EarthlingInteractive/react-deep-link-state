import Link from './lib';

export default {

    linkState(statePath, options, callback) {
        return new Link(this, statePath, options, callback);
    }
};
