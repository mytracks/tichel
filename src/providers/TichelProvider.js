import React, { createContext, useContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import useAddParticipation from '../TichelClient/useAddParticipation'
import useDeleteParticipation from '../TichelClient/useDeleteParticipation'
import useGetTichel from '../TichelClient/useGetTichel'
import useNewParticipant from '../TichelClient/useNewParticipant'

const TichelContext = createContext()
const DispatchContext = createContext()

const useTichelContext = () => {
  const contextValue = useContext(TichelContext)

  if (contextValue === undefined) {
    throw new Error('useTichelContext must be used within <TichelProvider />')
  }

  return contextValue
}

const useDispatchContext = () => {
  const contextValue = useContext(DispatchContext)

  if (contextValue === undefined) {
    throw new Error('useDispatchContext must be used within <TichelProvider />')
  }

  return contextValue
}

const getParticipationType = (participant, time) => {
  for (let participation of time.participations) {
    if (participation.participant.id === participant.id) {
      return participation.type
    }
  }

  return 0
}

const TichelProvider = ({ id, children }) => {
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

  const sortTichel = (currentTichel) => {
    return {
      ...currentTichel,
      times: currentTichel.times
        .slice()
        .sort((a, b) => (a.start > b.start ? 1 : -1)),
    }
  }

  const reducer = (currentTichel, action) => {
    console.log('Reducer: ' + action.type)
    switch (action.type) {
      case 'tichelLoaded':
        return sortTichel(action.payload)
      case 'changeParticipation':
        const participant = action.payload.participant
        const time = action.payload.time
        const newTimes = changeParticipation(
          currentTichel.times,
          participant,
          time
        )
        return sortTichel({
          ...currentTichel,
          times: newTimes,
        })
      case 'newParticipant':
        const name = action.payload.name
        const participantId = newParticipant(currentTichel, name)
        return sortTichel({
          ...currentTichel,
          participants: [
            ...currentTichel.participants,
            {
              name: name,
              id: participantId,
            },
          ],
        })
      case 'addTime':
        const { start, end, timeId } = action.payload

        return sortTichel({
          ...currentTichel,
          times: [
            ...currentTichel.times,
            { start: start, end: end, id: timeId, participations: [] },
          ],
        })
      default:
        throw new Error()
    }
  }

  const [addParticipationMutation] = useAddParticipation(id)
  const [deleteParticipationMutation] = useDeleteParticipation(id)
  const [newParticipantMutation] = useNewParticipant(id)
  const [tichel, dispatch] = useReducer(reducer, null)
  /*const { loading, error } =*/ useGetTichel(id, ({ tichel }) => {
    dispatch({ type: 'tichelLoaded', payload: tichel })
  })

  return (
    <TichelContext.Provider value={tichel}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TichelContext.Provider>
  )
}

export {
  TichelProvider,
  useTichelContext,
  useDispatchContext,
  getParticipationType,
}
