import { v4 as uuid } from 'uuid'

const newParticipant = (tichel, name, newParticipantHook) => {
  const participantId = uuid()
  newParticipantHook({
    variables: {
      participantId: participantId,
      name: name,
      tichelId: tichel.id,
    },
  })

  return participantId
}

export default newParticipant
