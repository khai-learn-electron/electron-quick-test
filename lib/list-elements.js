
'use strict'

var {create: createObject} = Object

var empobj = () => createObject(null)

function ElementList(root) {

    var byId = empobj(), byName = empobj(), byClass = empobj(), namemap = new WeakMap()
    var currentrepresent = empobj(), representchain = new WeakMap([[currentrepresent, null]])

    namemap.set(currentrepresent, root)

    traverse(root)

    return {
        root, byId, byName, byClass, namemap,
        __proto__: this
    }

    function traverse(element) {

        var {id, name, classList} = element

        if (id) {
            byId[id] = element
        }

        if (name) {
            let newrepresent = currentrepresent[name] = empobj()
            namemap.set(newrepresent, element)
            representchain.set(newrepresent, currentrepresent)
            currentrepresent = newrepresent
        }

        for (let cname of classList) {
            let cgroup = byClass[cname]
            if (!cgroup) {
                cgroup = byClass[cname] = new Set()
            }
            cgroup.add(element)
        }

        for (let child of element.children) {
            traverse(child)
        }

        if (name) {
            currentrepresent = representchain.get(currentrepresent)
        }

    }

}


module.exports = class extends ElementList {

    getById(id) {
        return this.byId[id]
    }

    getByNameAddress(address) {
        if (typeof address === 'string') {
            return this.getByNameAddress(address.split(/.|(->)|\/|(>>)/))
        }
        var {namemap, byName} = this
        var represent = address.reduce((object, name) => object[name], byName)
        return namemap.get(represent)
    }

    getByClass(cname) {
        return this[cname] || new Set()
    }

    * classes(cname) {
        yield * this.getByClass(cname)
    }

}
