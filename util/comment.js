const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/**
 * @returns {String} 随机生成的字符串
 * @param {Number} n 需要生成的字符串的字符数
 */
const randomChar = (n) => {
    let ret = ''
    for (let i = 0; i < n; i++) {
        let index = Math.floor(Math.random() * 36)
        ret += chars[index]
    }
    return ret
}

export default randomChar

export {
    randomChar
}