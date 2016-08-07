
(module => {
    'use strict';

    var createKeystoreListener = ({key, ctrl = false, alt = false, shift = false, callback}) => event =>
            key == event.keyCode && ctrl == event.ctrlKey && alt == event.altKey && shift == event.shiftKey && callback(event)

    Object.assign(createKeystoreListener, {
        fromArray: ([key, ctrl, alt, shift], callback) =>
            createKeystoreListener({key, ctrl, alt, shift, callback}),
        fromArguments: (key, ctrl, alt, shift, callback) =>
            createKeystoreListener({key, ctrl, alt, shift, callback})
    })

    module.exports = createKeystoreListener;

})(module);
