import { getValueFromState, onChange } from './lib';
import ReactLink from 'react/lib/ReactLink';

export default function decorator(target) {

    Object.defineProperty(target.prototype, 'linkState', {
        value(statePath, options, callback) {
        
            if (typeof statePath == "string") {
                statePath = statePath.split(/[\.\[\]]/g);
            }
            
            if (typeof options == "function") {
                callback = options;
                options = false;
            }
            
            var link = new ReactLink(
                getValueFromState.call(this, statePath, options),
                onChange.bind(this, statePath, options, callback)
            );

            return link;
        }
    });
};
