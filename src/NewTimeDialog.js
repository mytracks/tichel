import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import React, { useState } from 'react'

const NewTimeDialog = ({ open, onCancel, onCreate }) => {
  const now = new moment()
  const [startDay, setStartDay] = useState(now.format('YYYY-MM-DD'))
  const [startTime, setStartTime] = useState(now.format('HH:mm:ss'))
  const [endDay, setEndDay] = useState(now.format('YYYY-MM-DD'))
  const [endTime, setEndTime] = useState(now.format('HH:mm:ss'))
  const [isValid, setIsValid] = useState(true)

  const handleCancel = (event) => {
    onCancel()
  }

  const handleCreate = (event) => {
    onCreate(parse())
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
    const end = moment(`${endDay}T${endTime}`)

    console.log(
      'start: ' + JSON.stringify(start) + '  end: ' + JSON.stringify(end)
    )

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
      <DialogTitle id="form-dialog-title">New Time</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please set the values for a new time column.
        </DialogContentText>
        <TextField
          id="startday"
          label="Start Day"
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
          id="starttime"
          label="Start Time"
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
        <TextField
          id="endday"
          label="End Day"
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
          id="endtime"
          label="End Time"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary" disabled={!isValid}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewTimeDialog
