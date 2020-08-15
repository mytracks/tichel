const validateEmail = (address) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(address)) {
    return true
  }
  return false
}

export default validateEmail
