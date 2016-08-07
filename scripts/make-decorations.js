
'use strict'

const XMLNS = document.documentElement.namespaceURI

var mknode = descriptor => {
    switch (typeof descriptor) {
        case 'string':
            return document.createTextNode(descriptor)
        case 'object':
            return mkelement(descriptor)
    }
    throw new TypeError('Invalid descriptor')
}

var mkelement = ({tag, children = [], attributes = {}, xmlns = XMLNS}) => {
    var element = document.createElementNS(xmlns, tag)
    for (let child of children) {
        element.insertBefore(mknode(child), null)
    }
    for (let aname in attributes) {
        element.setAttribute(aname, attributes[aname])
    }
    return element
}

var labelKeyStroke = keystroke =>
    String(keystroke).split('-').map(key => key[0].toUpperCase() + key.slice(1)).join(' + ')

traverse(document.body)

function traverse(element) {

    var keybinding = element.getAttribute('x-keybinding')

    if (keybinding) {

        let container = mkelement({
            tag: 'div',
            attributes: {
                class: 'pull-right horizonal-layout wider-space-children small-text'
            }
        })

        for (let keystroke of keybinding.split(' ')) {
            let child = mkelement({
                tag: 'kbd',
                children: [labelKeyStroke(keystroke)]
            })
            container.insertBefore(child, null)
        }

        element.insertBefore(container, null)

    }

    for (let child of element.children) {
        traverse(child)
    }

}
