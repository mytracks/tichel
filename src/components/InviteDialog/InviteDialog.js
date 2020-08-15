import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useTichelContext } from '../../providers/TichelProvider'
import validateemail from '../../utils/validateemail'

const styles = (theme) => ({
  root: {},
  textField: {
    // fullWidth: true,
    margin: theme.spacing(1),
  },
})

const InviteDialog = withStyles(styles)(({ open, classes, onClose }) => {
  const { t } = useTranslation()
  const tichel = useTichelContext()

  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)

  const sendMail = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: tichel.title,
        tichel_id: tichel.id,
        email: email,
      }),
    }
    fetch('https://api.tichel.de/mailer/invite', requestOptions)
    // .then((response) => response.json())
    // .then((data) => this.setState({ postId: data.id }))
  }

  const handleCancel = () => {
    onClose()
  }

  const handleCreate = () => {
    sendMail()

    onClose()
  }

  const handleEmailChange = (event) => {
    const newValue = event.target.value
    setEmail(newValue)

    validate(newValue)
  }

  const validate = (email) => {
    const emailValid = validateemail(email)

    setIsValid(emailValid)
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Trans>Invite a friend to this Tichel</Trans>
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            fullWidth={true}
            className={classes.textField}
            id="email"
            label={t('E-mail address of your friend')}
            type="string"
            defaultValue={email}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleEmailChange}
            autoFocus
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          <Trans>Cancel</Trans>
        </Button>
        <Button onClick={handleCreate} color="primary" disabled={!isValid}>
          <Trans>Send</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default InviteDialog
