import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatchContext } from './providers/TichelProvider'

const styles = (theme) => ({
  textField: {
    fullWidth: true,
    margin: theme.spacing(1),
  },
})

const NewTimeDialog = withStyles(styles)(({ open, onClose, classes }) => {
  const { t } = useTranslation()
  const dispatch = useDispatchContext()
  const now = new moment()
  const [startDay, setStartDay] = useState(now.format('YYYY-MM-DD'))
  const [startTime, setStartTime] = useState(now.format('HH:mm:ss'))
  const [endDay, setEndDay] = useState(now.format('YYYY-MM-DD'))
  const [endTime, setEndTime] = useState(now.format('HH:mm:ss'))
  const [isValid, setIsValid] = useState(true)

  const handleCancel = () => {
    onClose()
  }

  const handleCreate = () => {
    const payload = parse()

    if (payload) {
      dispatch({ type: 'addTime', payload: payload })
      onClose()
    }
  }

  const handleStartDayChange = (event) => {
    setStartDay(event.target.value)

    parse()
  }

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value)

    parse()
  }

  const handleEndDayChange = (event) => {
    setEndDay(event.target.value)

    parse()
  }

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value)

    parse()
  }

  const parse = () => {
    const start = moment(`${startDay}T${startTime}`)
    let end = moment(`${endDay}T${endTime}`)

    if (end < start) {
      setEndDay(startDay)
      setEndTime(startTime)
    }

    if (start && end) {
      setIsValid(true)
      return { start: start, end: end }
    }

    return null
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Trans>New Option</Trans>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText></DialogContentText> */}
        <div>
          <TextField
            className={classes.textField}
            id="startday"
            label={t('Start')}
            type="date"
            defaultValue={startDay}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleStartDayChange}
          />
          <TextField
            className={classes.textField}
            id="starttime"
            label={t('Time')}
            type="time"
            defaultValue={startTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleStartTimeChange}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            id="endday"
            label={t('End')}
            type="date"
            defaultValue={endDay}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleEndDayChange}
          />
          <TextField
            className={classes.textField}
            id="endtime"
            label={t('Time')}
            type="time"
            defaultValue={endTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleEndTimeChange}
          />
        </div>
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
