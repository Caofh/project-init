

let global = require('../global/global');

function setGlobal (key, value) {
    global[key] = value
}

function getGlobal (key) {
    let result = ''
    if (key) {
        result = global[key]
    } else {
        result = global
    }

    return result
}


export {
    setGlobal,
    getGlobal,
}




