const storageAvailable = (storage) => {
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
      return
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
const setSelfId = (tichelId, participantId) =>
  setValue(tichelId, 'self_id', participantId)
const getSelfId = (tichelId) => getValue(tichelId, 'self_id')
const setTitle = (tichelId, title) => setValue(tichelId, 'title', title)
const getTitle = (tichelId) => getValue(tichelId, 'title')
const setCreatedAt = (tichelId, createdAt) =>
  setValue(tichelId, 'created_at', createdAt)
const getCreatedAt = (tichelId) => getValue(tichelId, 'created_at')

const getYourTichels = () => {
  const storage = window['localStorage']

  const res = Object.keys(storage)
    .filter((key) => {
      if (key.length > 37) {
        const type = key.slice(37)

        return type === 'title'
      }

      return false
    })
    .map((key) => {
      const guid = key.slice(0, 36)
      const title = storage.getItem(key)
      const createdAt = getCreatedAt(guid)

      return { guid, title, createdAt }
    })
    .slice()
    .sort((a, b) => {
      console.log('1')
      if (a.createdAt && !b.createdAt) {
        return -1
      }

      console.log('2')
      if (!a.createdAt && b.createdAt) {
        return 1
      }

      console.log('3')
      if ((!a.createdAt && !b.createdAt) || a.createdAt === b.createdAt) {
        return a.title.toLowerCase() >= b.title.toLowerCase() ? 1 : -1
      }

      console.log('4')
      return a.createdAt <= b.createdAt ? 1 : -1
    })

  return res
}

export {
  setCreationId,
  getCreationId,
  setSelfId,
  getSelfId,
  setTitle,
  getTitle,
  setCreatedAt,
  getCreatedAt,
  getYourTichels,
}
