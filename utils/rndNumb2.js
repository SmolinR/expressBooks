function randomNumber2(min, max) {
    let a = Math.random() * (max - min) + min
    return Math.floor(a)
}

module.exports = randomNumber2