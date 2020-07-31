const getHHMM = (date) => {
  let hours = date.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }

  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  return `${hours}:${minutes}`
}

const getHHMMSS = (date) => {
  let hours = date.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }

  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  let seconds = date.getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  return `${hours}:${minutes}:${seconds}`
}

const getYYYYMMDD = (date) => {
  const years = date.getFullYear()

  let months = date.getMonth() + 1
  if (months < 10) {
    months = '0' + months
  }

  let days = date.getDate()
  if (days < 10) {
    days = '0' + days
  }

  return `${years}-${months}-${days}`
}

export { getHHMM, getHHMMSS, getYYYYMMDD }
