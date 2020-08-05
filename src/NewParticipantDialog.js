import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatchContext } from './providers/TichelProvider'

const styles = (theme) => ({
  textField: {
    fullWidth: true,
    margin: theme.spacing(1),
  },
})

const NewParticipantDialog = withStyles(styles)(
  ({ open, classes, onClose }) => {
    const { t } = useTranslation()
    const dispatch = useDispatchContext()

    const [name, setName] = useState('')
    const [isValid, setIsValid] = useState(true)

    const handleCancel = () => {
      onClose()
    }

    const handleCreate = () => {
      dispatch({ type: 'newParticipant', payload: { name: name } })
      onClose()
    }

    const handleNameChange = (event) => {
      setName(event.target.value)

      validate()
    }

    const validate = () => {
      setIsValid(name.length > 0)
    }

    return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Trans>Add yourself to this Tichel</Trans>
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              className={classes.textField}
              id="name"
              label={t('Your Name')}
              type="string"
              defaultValue={name}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleNameChange}
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
  }
)

export default NewParticipantDialog
