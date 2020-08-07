import { Box, Checkbox, Container, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { v4 as uuid } from 'uuid'
import {
  getParticipationType,
  useDispatchContext,
  useTichelContext,
} from '../../providers/TichelProvider'
import useAddParticipation from '../../TichelClient/useAddParticipation'
import useDeleteParticipation from '../../TichelClient/useDeleteParticipation'
import {
  getDayMonth,
  getDayOfWeek,
  getHHMM,
  getShortMonth,
} from '../../utils/dateutils'
import { getSelfId } from '../../utils/storage'

const styles = (theme) => ({
  root: {
    border: 'solid lightgrey',
    borderTopWidth: '0px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '1px',
    padding: '4px',
  },
  dateContainer: {
    width: '100px',
  },
  day: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: '0px',
    margin: '-0.2em 0px -0.2em 0px',
  },
  month: {
    fontSize: '0.8em',
  },
  dayOfWeek: {
    fontSize: '0.8em',
    color: 'lightgrey',
  },
  checkboxContainer: {
    width: '100px',
  },
})

const TimeRow = withStyles(styles)(({ classes, participant, time }) => {
  const dispatch = useDispatchContext()
  const tichel = useTichelContext()
  const [addParticipationMutation] = useAddParticipation(tichel.id)
  const [deleteParticipationMutation] = useDeleteParticipation(tichel.id)

  const handleParticipationChange = () => {
    let times = []

    for (const t of tichel.times) {
      if (t.id !== time.id) {
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
            if (false) {
              deleteParticipationMutation({
                variables: { id: participation.id },
              })
            }
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

          if (false) {
            addParticipationMutation({
              variables: { participantId: participant.id, timesId: time.id },
            })
          }
        }

        let newTime = { ...t }
        newTime.participations = participations

        times.push(newTime)
      }
    }

    dispatch({
      type: 'changeParticipation',
      payload: { times: times },
    })
  }

  const start = new Date(time.start)
  const end = new Date(time.end)
  const participationType = getParticipationType(participant, time)

  let canChange = getSelfId(tichel.id) === participant.id

  return (
    <Box className={classes.root} display="flex">
      <Container className={classes.dateContainer}>
        <Typography className={classes.month} align="center">
          {getShortMonth(start)}
        </Typography>
        <Typography className={classes.day} align="center">
          {getDayMonth(start)}
        </Typography>
        <Typography className={classes.dayOfWeek} align="center">
          {getDayOfWeek(start)}
        </Typography>
      </Container>
      <Container>
        <Typography>
          {getHHMM(start)} - {getHHMM(end)}
        </Typography>
      </Container>
      <Container className={classes.checkboxContainer}>
        <Checkbox
          className={classes.greenCheckbox}
          checked={participationType !== 0}
          onClick={handleParticipationChange}
          color="primary"
          disabled={!canChange}
        ></Checkbox>
      </Container>
    </Box>
  )
})

export default TimeRow
