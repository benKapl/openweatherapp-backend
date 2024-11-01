function checkBody(body, toTest) {
    for (let element of toTest) {

        if (!body[element]) {
            return false
        }
    }
    return true 
}

module.exports = { checkBody }