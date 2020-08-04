import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import Participant from './Participant'

const styles = (theme) => ({
  root: {},
  button: {
    margin: 'auto',
  },
  cardContent: {
    margin: 'auto',
  },
})

const ParticipantsTable = withStyles(styles)(
  ({ classes, tichel, onParticipationChange }) => {
    const handleParticipationChange = (participant, time) => {
      onParticipationChange(participant, time)
    }

    if (tichel.times.length === 0) {
      return null
    }

    return (
      <div>
        {tichel.participants.map((participant) => (
          <Participant
            key={participant.id}
            participant={participant}
            times={tichel.times}
            onParticipationChange={handleParticipationChange}
          ></Participant>
        ))}
      </div>
    )
  }
)

export default ParticipantsTable
