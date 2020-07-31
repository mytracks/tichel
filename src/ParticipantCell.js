import React from 'react'

const ParticipantCell = ({ participant }) => {
  return (
    <div key={participant.id} className="ParticipantCell">
      {participant.name}
    </div>
  )
}

export default ParticipantCell
