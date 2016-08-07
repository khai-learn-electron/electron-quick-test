
'use strict'

; (({document, location, close}) => {

    var keystroke = require('./lib/keystroke.js').fromArguments
    var {toggleDevTools} = require('./lib/communicate-renderer.js')
    var ElementList = require('./lib/list-elements.js')

    var reload = () => location.reload()
    var elementlist = new ElementList(document.documentElement).byId

    ; [
        [123, 0, 0, 0, toggleDevTools],
        [116, 0, 0, 0, reload],
        [ 27, 0, 0, 0, close]
    ].forEach(
        args =>
            document.addEventListener('keydown', keystroke(...args), false)
    )

    ; [
        ['devtools', toggleDevTools],
        ['reload', reload],
        ['exit', close]
    ].forEach(
        ([ename, callback]) =>
            elementlist[ename].addEventListener('click', callback, false)
    )

})(window);
