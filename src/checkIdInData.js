const data = require("../data");

function checkIdInData(id) {
    let index
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            index = i
        }
    }
    return index


}

module.exports = {checkIdInData}