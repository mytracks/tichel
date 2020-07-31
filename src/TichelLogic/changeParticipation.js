import { v4 as uuid } from 'uuid'

const changeParticipation = (
  currentTimes,
  participant,
  time,
  addParticipationHook,
  deleteParticipationHook
) => {
  let times = []

  for (const t of currentTimes) {
    if (t !== time) {
      times.push(t)
    } else {
      let participations = []
      let didParticipate = false
      for (const participation of time.participations) {
        if (participation.participant.id !== participant.id) {
          participations.push(participation)
        } else {
          // participant already takes part
          didParticipate = true
          deleteParticipationHook({ variables: { id: participation.id } })
        }
      }

      if (!didParticipate) {
        let newParticipation = {
          type: 1,
          id: uuid(),
          participant: {
            id: participant.id,
          },
        }

        participations.push(newParticipation)

        addParticipationHook({
          variables: { participantId: participant.id, timesId: time.id },
        })
      }

      let newTime = { ...t }
      newTime.participations = participations

      times.push(newTime)
    }
  }

  return times
}

export default changeParticipation
