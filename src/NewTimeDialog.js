import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'

const NewTimeDialog = ({ open, onClose }) => {
  const [day, setDay] = useState('2020-07-31')

  const handleOnClose = (event) => {
    onClose()
  }

  const handleDateChange = (event) => {
    const date = event.target.value
    setDay(date)
    console.log(typeof date)
    console.log(JSON.stringify(date))
  }

  const handleStartChange = (event) => {
    const start = event.target.value
    console.log(JSON.stringify(start))
  }

  const handleEndChange = (event) => {
    const end = event.target.value
    console.log(JSON.stringify(end))
  }

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Time</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please set the values for a new time column.
        </DialogContentText>
        <TextField
          id="date"
          label="Day"
          type="date"
          defaultValue="2020-07-31"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateChange}
        />
        <TextField
          id="time"
          label="Start"
          type="time"
          defaultValue={day}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={handleStartChange}
        />
        <TextField
          id="time"
          label="End"
          type="time"
          defaultValue="07:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={handleEndChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewTimeDialog
