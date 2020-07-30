import React from 'react';
import ParticipantRow from './ParticipantRow';

const ParticipantRows = ({ times, participants, onParticipationChange = (participant, time) => {} }) => {
  const participationChanged = (participant, time) => {
    console.log(`ParticipantRows: ${participant.name}: Time ${time.start.toString()} clicked`)
    onParticipationChange(participant, time)
  }

  return (
    participants.map( participant => <ParticipantRow key={participant.id} participant={participant} times={times} onParticipationChange={participationChanged} />)
  )
}

export default ParticipantRows