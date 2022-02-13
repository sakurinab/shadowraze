/**
 * @param {Number} sec
 */
module.exports = sec => {
    var h = Math.floor(sec % (3600*24) / 3600)
    var m = Math.floor(sec % 3600 / 60)
    return `${h}ч. ${m}м.`
}