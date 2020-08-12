import { Checkbox, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
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
import { getSelfId } from '../../utils/storage'
import TimeCellArbitrary from './TimeCellArbitrary'
import TimeCellSameDay from './TimeCellSameDay'
import TimeCellSameMonth from './TimeCellSameMonth'

const styles = (theme) => ({
  root: {
    border: 'solid lightgrey',
    borderTopWidth: '0px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '1px',
    padding: '0px',
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
  cell: {
    // padding: theme.spacing(0),
    // marginBottom: theme.spacing(4),
  },
})

const TimeRow = withStyles(styles)(({ classes, participant, time, config }) => {
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

  const participationType = getParticipationType(participant, time)
  const participantCount = time.participations.length

  let participantsText = ''
  if (participantCount === 1) {
    participantsText = t('1 participant')
  } else if (participantCount > 1) {
    participantsText = t('x_participants', {
      participantCount: `${participantCount}`,
    })
  }

  participantsText = `${participantCount}`

  const canChange = getSelfId(tichel.id) === participant.id

  const start = moment(time.start)
  const end = moment(time.end)

  const sameDay = config.sameDay
  const sameMonth = !sameDay && config.sameMonth
  const arbitrary = !config.sameMonth

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        {sameDay && (
          <>
            <TimeCellSameDay
              start={start}
              end={end}
              className={classes.cell}
              config={config}
            />
          </>
        )}
        {sameMonth && (
          <>
            <TimeCellSameMonth
              start={start}
              end={end}
              className={classes.cell}
              config={config}
            />
          </>
        )}
        {arbitrary && (
          <>
            <TimeCellArbitrary
              start={start}
              end={end}
              className={classes.cell}
              config={config}
            />
          </>
        )}
        {/* <Grid item xs={3}>
          <Typography className={classes.month} align="center">
            {getShortMonth(start)}
          </Typography>
          <Typography className={classes.day} align="center">
            {getDayMonth(start)}
          </Typography>
          <Typography className={classes.dayOfWeek} align="center">
            {getDayOfWeek(start)}
          </Typography>
        </Grid> */}
        <Grid item xs={2}>
          {/* <Typography>
            {getHHMM(start)} - {getHHMM(end)}
          </Typography> */}
          <Typography className={classes.cell}>{participantsText}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            className={classes.cell}
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
