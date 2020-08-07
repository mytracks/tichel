const storageAvailable = (storage) => {
  return true
  try {
    const x = '__storage_test__'

    storage.setItem(x, x)
    storage.removeItem(x)

    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}

const setValue = (tichelId, type, value) => {
  const storage = window['localStorage']
  if (storageAvailable(storage)) {
    try {
      let key = `${tichelId}_${type}`
      storage.setItem(key, value)
    } catch (e) {}
  }
  console.log('storage not available')
}

const getValue = (tichelId, type) => {
  const storage = window['localStorage']
  if (storageAvailable(storage)) {
    try {
      let key = `${tichelId}_${type}`
      let value = storage.getItem(key)

      return value
    } catch (e) {}
  }
  console.log('storage not available')

  return null
}

const setCreationId = (tichelId, creationId) =>
  setValue(tichelId, 'creation_id', creationId)
const getCreationId = (tichelId) => getValue(tichelId, 'creation_id')
const setSelfId = (tichelId, creationId) =>
  setValue(tichelId, 'self_id', creationId)
const getSelfId = (tichelId) => getValue(tichelId, 'self_id')

export { setCreationId, getCreationId, setSelfId, getSelfId }
