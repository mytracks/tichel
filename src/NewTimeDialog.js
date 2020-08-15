import { FormControl, FormGroup, FormLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import { DateTimePicker } from '@material-ui/pickers'
import moment from 'moment'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import {
  useDispatchContext,
  useTichelContext,
} from './providers/TichelProvider'
import useAddTime from './TichelClient/useAddTime'

const styles = (theme) => ({
  textField: {
    fullWidth: true,
    margin: theme.spacing(1),
  },
  formControl: {
    margin: 'auto',
    width: '100%',
    padding: '0px 0px 20px 0px',
  },
})

const NewTimeDialog = withStyles(styles)(({ open, onClose, classes }) => {
  const { t } = useTranslation()
  const dispatch = useDispatchContext()
  const tichel = useTichelContext()
  const [isValid, setIsValid] = useState(true)
  const [addTimeMutation] = useAddTime(tichel.id, tichel.creationId)

  const initialStart = moment().add(1, 'd')
  initialStart.hour(9)
  initialStart.minutes(0)
  initialStart.seconds(0)

  const initialEnd = moment(initialStart).add(1, 'h')

  const [startDateTime, setStartDateTime] = useState(initialStart)
  const [endDateTime, setEndDateTime] = useState(initialEnd)

  const handleCancel = () => {
    onClose()
  }

  const handleCreate = () => {
    const payload = parse()

    if (payload) {
      const timeId = uuid()
      addTimeMutation({
        variables: {
          id: timeId,
          start: payload.start,
          end: payload.end,
          tichelId: tichel.id,
        },
      })
      dispatch({ type: 'addTime', payload: { ...payload, timeId: timeId } })
      onClose()
    }
  }

  const parse = () => {
    if (startDateTime && endDateTime) {
      setIsValid(true)
      return {
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
      }
    }

    return null
  }

  const handleStartAccepted = (newStartDateTime) => {
    if (endDateTime <= newStartDateTime) {
      setEndDateTime(moment(newStartDateTime).add(1, 'h'))
    }
  }

  const handleEndAccepted = (newEndDateTime) => {
    if (startDateTime >= newEndDateTime) {
      setStartDateTime(moment(newEndDateTime).add(-1, 'h'))
    }
  }

  const formatDate = (date, invalidLabel) => {
    return date.format('LLL')
  }

  const ampm = moment.locale() !== 'de'

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Trans>New Time Option</Trans>
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{t('Start')}</FormLabel>
          <FormGroup>
            <DateTimePicker
              value={startDateTime}
              onChange={setStartDateTime}
              labelFunc={formatDate}
              disablePast
              ampm={ampm}
              onAccept={handleStartAccepted}
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{t('End')}</FormLabel>
          <FormGroup>
            <DateTimePicker
              value={endDateTime}
              onChange={setEndDateTime}
              labelFunc={formatDate}
              minDate={startDateTime}
              disablePast
              ampm={ampm}
              onAccept={handleEndAccepted}
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          <Trans>Cancel</Trans>
        </Button>
        <Button onClick={handleCreate} color="primary" disabled={!isValid}>
          <Trans>Add</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default NewTimeDialog
