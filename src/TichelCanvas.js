import React from 'react'
import styled from 'styled-components'
import NewParticipant from './NewParticipant'
import ParticipantRows from './ParticipantRows'
import TichelHeader from './TichelHeader'

const TichelCanvasStyle = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 200px repeat(${(props) => props.count}, 100px);
`

const TichelCanvas = ({ tichel, onParticipationChange, onNewParticipant }) => {
  const participationChanged = (participant, time) => {
    onParticipationChange(participant, time)
  }

  if (tichel.times.length === 0) {
    return null
  }

  return (
    <TichelCanvasStyle count={tichel.times.length}>
      <TichelHeader tichel={tichel} />
      <ParticipantRows
        participants={tichel.participants}
        times={tichel.times}
        onParticipationChange={participationChanged}
      />
      <NewParticipant onEnter={onNewParticipant} />
    </TichelCanvasStyle>
  )
}

export default TichelCanvas
