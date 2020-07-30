import React from 'react';
import styled from 'styled-components'
import TichelHeader from './TichelHeader';
import ParticipantRows from './ParticipantRows'
import NewParticipant from './NewParticipant'

const TichelCanvasStyle = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 200px repeat(${props => props.count}, 100px);
`

const TichelCanvas = ({ tichel, onParticipationChange, onNewParticipant}) => {
  const participationChanged = (participant, time) => {
    console.log(`TichelCanvas: ${participant.name}: Time ${time.start.toString()} clicked`)
    onParticipationChange(participant, time)
  }

  return (
    <TichelCanvasStyle count={tichel.times.length + 1}>
      <TichelHeader tichel={tichel} />
      <ParticipantRows participants={tichel.participants} times={tichel.times} onParticipationChange={participationChanged} />
      <NewParticipant onEnter={onNewParticipant} />
    </TichelCanvasStyle>
  )
}

export default TichelCanvas