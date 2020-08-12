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
  innerGrid: {
    border: 'solid #aaaaaa',
    borderTopWidth: '0px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '1px',
    backgroundColor: '#F9F9F9',
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
    <Grid item xs={12} sm={6} lg={4}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.innerGrid}
      >
        {sameDay && (
          <>
            <TimeCellSameDay start={start} end={end} config={config} />
          </>
        )}
        {sameMonth && (
          <>
            <TimeCellSameMonth start={start} end={end} config={config} />
          </>
        )}
        {arbitrary && (
          <>
            <TimeCellArbitrary start={start} end={end} config={config} />
          </>
        )}
        <Grid item xs={1}>
          <Typography>{participantsText}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Checkbox
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
