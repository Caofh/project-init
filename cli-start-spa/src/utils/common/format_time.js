function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime(dateStamp, symbol = '-', isShowTime = true) {
  const date = new Date(dateStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join(symbol)
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return isShowTime ? `${t1} ${t2}` : `${t1}`
}

export {
  formatNumber,
  formatTime
}