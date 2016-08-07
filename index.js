
'use strict'

var {join: joinPath} = require('path')
var {app} = require('electron')
var {windows} = require('electron-utils')

require('./lib/communicate-main.js').init()

app.on('ready', onready)
app.on('window-all-closed', onallclosed)

function onready() {
    windows.createWindow({
        autoHideMenuBar: true
    }, joinPath(__dirname, 'index.xml'))
}

function onallclosed() {
    console.error('QUIT.')
    app.quit()
}
