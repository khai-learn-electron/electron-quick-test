
'use strict'

var {join} = require('path')
var {readdirSync} = require('fs')

var scripts = join(__dirname, 'scripts')
var {body} = document

readdirSync(scripts)
    .filter(fname => fname !== 'main.js')
    .map(fname => {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = join(scripts, fname)
        return script
    })
    .forEach(script => body.appendChild(script))
