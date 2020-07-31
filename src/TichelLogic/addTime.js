import { v4 as uuid } from 'uuid'

const addTime = (tichel, start, end, addTimeHook) => {
  const timeId = uuid()
  addTimeHook({
    variables: {
      id: timeId,
      start: start,
      end: end,
      tichelId: tichel.id,
    },
  })

  return timeId
}

export default addTime
