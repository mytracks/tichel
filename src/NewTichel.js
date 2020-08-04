import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import useNewTichel from './TichelClient/useNewTichel'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  outerDiv: {
    margin: '8px',
  },
  paper: {
    margin: 'auto',
    maxWidth: '800px',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.sendondary,
  },
  textField: {
    fullWidth: true,
    margin: theme.spacing(1),
  },
  footer: {
    padding: '20px',
    position: 'sticky',
    top: '30px',
    left: '30px',
  },
})

const NewTichel = withStyles(styles)(({ classes }) => {
  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')

  const handleTitleChanged = (event) => {
    setTitle(event.target.value)
  }

  const handleNameChanged = (event) => {
    setName(event.target.value)
  }

  const handleEmailChanged = (event) => {
    setEmail(event.target.value)
  }

  const handleNewTichel = (event) => {
    newTichel({
      variables: {
        title: title,
        tichelId: newTichelId,
        name: name,
        email: email,
      },
    })
    event.preventDefault()
  }

  const tichelCreated = ({ id }) => {
    setId(id)
  }

  const newTichelId = uuid()
  const [newTichel] = useNewTichel(newTichelId, tichelCreated)

  if (id) {
    return <Redirect to={'/tichel/' + id} />
  }

  const canCreate = title.length > 0 && name.length > 0

  return (
    <div className={classes.outerDiv}>
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h5" gutterBottom>
            <Trans>Welcome to Tichel</Trans>
          </Typography>
          <Typography variant="caption" gutterBottom>
            <Trans>What's the occasion?</Trans>
          </Typography>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              className={classes.textField}
              id="title"
              label={t('Title')}
              type="text"
              defaultValue=""
              onChange={handleTitleChanged}
            />
            <TextField
              className={classes.textField}
              id="name"
              label={t('Your Name')}
              type="text"
              defaultValue=""
              onChange={handleNameChanged}
            />
            <TextField
              className={classes.textField}
              id="email"
              label={t('E-Mail')}
              type="text"
              defaultValue=""
              onChange={handleEmailChanged}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewTichel}
              disabled={!canCreate}
            >
              <Trans>Create Tichel</Trans>
            </Button>
          </div>
        </form>
      </Paper>
      <Typography className={classes.footer}>
        Made with ❤ in Paderborn, Germany.
      </Typography>
    </div>
  )
})

export default NewTichel
