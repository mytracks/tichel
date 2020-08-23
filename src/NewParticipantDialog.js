import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import {
  useDispatchContext,
  useTichelContext,
} from './providers/TichelProvider'
import useNewParticipant from './TichelClient/useNewParticipant'
import { setSelfId } from './utils/storage'

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
    const tichel = useTichelContext()
    const [newParticipantMutation] = useNewParticipant(tichel.id)

    const [name, setName] = useState('')
    const [isValid, setIsValid] = useState(true)

    const handleCancel = () => {
      onClose()
    }

    const handleCreate = () => {
      const participantId = uuid()
      newParticipantMutation({
        variables: {
          participantId: participantId,
          name: name,
          tichelId: tichel.id,
        },
      })
      setSelfId(tichel.id, participantId)
      dispatch({
        type: 'newParticipant',
        payload: { name: name, id: participantId },
      })
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
              fullWidth={true}
              className={classes.textField}
              id="name"
              label={t('Your Name')}
              type="text"
              defaultValue={name}
              onChange={handleNameChange}
              autoFocus
              inputProps={{ maxLength: 128 }}
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
