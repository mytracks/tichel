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

const setCreationId = (tichelId, creationId) => {
  const storage = window['localStorage']
  if (storageAvailable(storage)) {
    try {
      let key = `${tichelId}_creation_id`
      storage.setItem(key, creationId)
    } catch (e) {}
  }
  console.log('storage not available')
}

const getCreationId = (tichelId) => {
  console.log('getCreationId: ' + tichelId)
  const storage = window['localStorage']
  if (storageAvailable(storage)) {
    try {
      let key = `${tichelId}_creation_id`
      let creation_id = storage.getItem(key)

      return creation_id
    } catch (e) {}
  }
  console.log('storage not available')
}

export { setCreationId, getCreationId }
