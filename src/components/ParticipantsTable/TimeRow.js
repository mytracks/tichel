import { Checkbox, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
    padding: '8px',
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
  const { t } = useTranslation()
  const dispatch = useDispatchContext()
  const tichel = useTichelContext()
  const [addParticipationMutation] = useAddParticipation(tichel.id)
  const [deleteParticipationMutation] = useDeleteParticipation(tichel.id)

  const handleParticipationChange = () => {
    let times = []

    for (const ti of tichel.times) {
      if (ti.id !== time.id) {
        times.push(ti)
      } else {
        let participations = []
        let didParticipate = false
        for (const participation of time.participations) {
          if (participation.participant.id !== participant.id) {
            participations.push(participation)
          } else {
            // participant already takes part
            didParticipate = true
            deleteParticipationMutation({
              variables: { id: participation.id },
            })
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
            variables: {
              participantId: participant.id,
              timesId: time.id,
              id: newParticipation.id,
            },
          })
        }

        let newTime = { ...ti }
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
  const participantCount = time.participations.length

  let participantsText = ''
  if (participantCount === 1) {
    participantsText = t('1 participant')
  } else if (participantCount > 1) {
    participantsText = t(`${participantCount} participants`)
  }

  let canChange = getSelfId(tichel.id) === participant.id

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Grid container direction="row" justify="flex-start" spacing={0}>
        <Grid item xs={3}>
          <Typography className={classes.month} align="center">
            {getShortMonth(start)}
          </Typography>
          <Typography className={classes.day} align="center">
            {getDayMonth(start)}
          </Typography>
          <Typography className={classes.dayOfWeek} align="center">
            {getDayOfWeek(start)}
          </Typography>
          {/* </Container>
      <Container> */}
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {getHHMM(start)} - {getHHMM(end)}
          </Typography>
          <Typography>{participantsText}</Typography>
          {/* </Container>
      <Container className={classes.checkboxContainer}> */}
        </Grid>
        <Grid item xs={3}>
          <Checkbox
            className={classes.greenCheckbox}
            checked={participationType !== 0}
            onClick={handleParticipationChange}
            color="primary"
            disabled={!canChange}
          />
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TimeRow
