import React, { createContext, useContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import useAddParticipation from '../TichelClient/useAddParticipation'
import useAddTime from '../TichelClient/useAddTime'
import useDeleteParticipation from '../TichelClient/useDeleteParticipation'
import useGetTichel from '../TichelClient/useGetTichel'
import useNewParticipant from '../TichelClient/useNewParticipant'

const TichelContext = createContext()
const DispatchContext = createContext()

const useTichelContext = () => {
  useContext(TichelContext)
}

const useDispatchContext = () => {
  useContext(DispatchContext)
}

const TichelProvider = ({ id, children }) => {
  const addTime = (tichel, start, end) => {
    const timeId = uuid()
    addTimeMutation({
      variables: {
        id: timeId,
        start: start,
        end: end,
        tichelId: tichel.id,
      },
    })

    return timeId
  }

  const changeParticipation = (currentTimes, participant, time) => {
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
            deleteParticipationMutation({ variables: { id: participation.id } })
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

          addParticipationMutation({
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

  const newParticipant = (tichel, name) => {
    const participantId = uuid()
    newParticipantMutation({
      variables: {
        participantId: participantId,
        name: name,
        tichelId: tichel.id,
      },
    })

    return participantId
  }

  const reducer = (currentTichel, action) => {
    switch (action.type) {
      case 'tichelLoaded':
        console.log('reducer: tichelLoaded:' + JSON.stringify(action.payload))
        return action.payload
      case 'changeParticipation':
        const participant = action.payload.participant
        const time = action.payload.time
        const newTimes = changeParticipation(
          currentTichel.times,
          participant,
          time
        )
        return {
          ...currentTichel,
          times: newTimes,
        }
      case 'newParticipant':
        const name = action.payload.name
        const participantId = newParticipant(currentTichel, name)
        return {
          ...currentTichel,
          participants: [
            ...currentTichel.participants,
            {
              name: name,
              id: participantId,
            },
          ],
        }
      case 'addTime':
        const { start, end } = action.payload
        const timeId = addTime(currentTichel, start, end)

        return {
          ...currentTichel,
          times: [
            ...currentTichel.times,
            { start: start, end: end, id: timeId, participations: [] },
          ],
        }
      default:
        throw new Error()
    }
  }

  const [addParticipationMutation] = useAddParticipation(id)
  const [deleteParticipationMutation] = useDeleteParticipation(id)
  const [newParticipantMutation] = useNewParticipant(id)
  const [addTimeMutation] = useAddTime(id)
  const [tichel, dispatch] = useReducer(reducer, null)
  const { loading, error } = useGetTichel(id, ({ tichel }) => {
    console.log('tichelLoaded')
    dispatch({ type: 'tichelLoaded', payload: tichel })
  })

  console.log('TichelProvider: ' + JSON.stringify(dispatch))

  return (
    <TichelContext.Provider value={tichel}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TichelContext.Provider>
  )
}

export { TichelProvider, useTichelContext, useDispatchContext }
