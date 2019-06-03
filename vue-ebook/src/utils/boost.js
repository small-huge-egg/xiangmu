/* eslint-disable */
// 数组去重
Array.prototype.pushWithoutDuplicate = function () {
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (this.indexOf(arg) === -1) {
      this.push(arg)
    }
  }
}