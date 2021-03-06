import React, { createContext, useContext, useReducer, useState } from 'react'
import { v4 as uuid } from 'uuid'
import useGetTichel from '../TichelClient/useGetTichel'
import { getCreationId } from '../utils/storage'

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
  const [previousTichel, setPreviousTichel] = useState('')

  const { data, refetch } = useGetTichel(id)

  const sortTichel = (tichel) => {
    let creationId = getCreationId(tichel.id) ?? uuid()

    return {
      ...tichel,
      creationId: creationId,
      times: tichel.times.slice().sort((a, b) => (a.start >= b.start ? 1 : -1)),
    }
  }

  const reducer = (currentTichel, action) => {
    switch (action.type) {
      case 'refreshCreationId':
        return sortTichel(currentTichel)
      case 'tichelLoaded':
        return sortTichel(action.payload)
      case 'changeParticipation':
        return sortTichel({
          ...currentTichel,
          times: action.payload.times,
        })
      case 'newParticipant':
        const name = action.payload.name
        const participantId = action.payload.id
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
      case 'refresh':
        refetch()

        return currentTichel
      default:
        throw new Error()
    }
  }

  const [tichel, dispatch] = useReducer(reducer, null)

  if (tichel && tichel.id !== id) {
    // id has changed
    refetch()
  }

  if (data && data !== previousTichel) {
    setPreviousTichel(data)
    if (data.tichels && data.tichels.length > 0) {
      dispatch({ type: 'tichelLoaded', payload: data.tichels[0] })
    }
  }

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
