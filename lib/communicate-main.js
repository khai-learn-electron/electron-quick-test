
'use strict'

module.exports = {
    init,
    __proto__: null
}

function init() {

    var {ipcMain} = require('electron')
    var {iterate} = require('object-property-iterator')

    iterate({
        TOGGLE_DEV_TOOLS: ({sender}) => sender.toggleDevTools(),
        __proto__: null
    }).assignments.forEach(
        ([message, callback]) =>
            ipcMain.on(message, callback)
    )

}
