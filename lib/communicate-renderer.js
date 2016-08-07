
'use strict'

var {ipcRenderer} = require('electron')
var {iterate} = require('object-property-iterator')

module.exports = iterate({
    toggleDevTools: 'TOGGLE_DEV_TOOLS',
    __proto__: null
}).assignments.values.map(
    message =>
        (...args) => ipcRenderer.send(message, ...args)
).object
