import React from 'react'
import ParticipantCell from './ParticipantCell'
import ParticipatesCell from './ParticipatesCell'

const ParticipantRow = ({
  participant,
  times,
  onParticipationChange = (participant, time) => {},
}) => {
  const getParticipationType = (time) => {
    for (let participation of time.participations) {
      if (participation.participant.id === participant.id) {
        return participation.type
      }
    }

    return 0
  }

  const participationClicked = (time) => {
    console.log(`Time ${time.start.toString()} clicked`)
    onParticipationChange(participant, time)
  }

  return (
    <React.Fragment>
      <ParticipantCell key={participant.id} participant={participant} />
      {times.map((time) => (
        <ParticipatesCell
          key={participant.id + time.id}
          type={getParticipationType(time)}
          clickHandler={() => participationClicked(time)}
        />
      ))}
    </React.Fragment>
  )
}

export default ParticipantRow
