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
import { setCreationId, setSelfId } from './utils/storage'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  outerDiv: {
    margin: '5vmin',
  },
  paper: {
    margin: 'auto',
    maxWidth: '800px',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.sendondary,
  },
  textField: {
    width: '100%',
    maxWidth: '480px',
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
  const [ids, setIds] = useState()
  const [doRedirect, setDoRedirect] = useState(false)

  const handleTitleChanged = (event) => {
    setTitle(event.target.value)
  }

  const handleNameChanged = (event) => {
    setName(event.target.value)
  }

  const handleEmailChanged = (event) => {
    setEmail(event.target.value)
  }

  const sendMail = ({ title, tichelId, creationId, email, participantId }) => {
    if (email.length > 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          tichel_id: tichelId,
          email: email,
          creation_id: creationId,
          participant_id: participantId,
        }),
      }
      fetch(
        'https://api.tichel.de/mailer/newtichel',
        requestOptions
      ).then((reponse) => {})
      //.then((response) => response.json())
      // .then((data) => this.setState({ postId: data.id }))
    }
  }

  const handleNewTichel = (event) => {
    const creationId = uuid()
    const newTichelId = uuid()
    const participantId = uuid()

    setCreationId(newTichelId, creationId)

    const variables = {
      title: title,
      tichelId: newTichelId,
      creationId: creationId,
      participantId: participantId,
      name: name,
      email: email,
    }

    sendMail(variables)

    newTichel({
      variables: variables,
      context: {
        headers: {
          'X-Hasura-Tichel-Id': newTichelId,
        },
      },
    })
    event.preventDefault()
  }

  const tichelCreated = (ids) => {
    setIds(ids)
  }

  const [newTichel] = useNewTichel(tichelCreated)

  if (ids) {
    const { id, participantId } = ids

    if (doRedirect) {
      return <Redirect to={'/tichel/' + id} />
    }

    setSelfId(id, participantId)
    setDoRedirect(true)
  }

  const canCreate = title.length > 0 && name.length > 0

  return (
    <div className={classes.outerDiv}>
      <Paper className={classes.paper} variant="elevation" elevation={8}>
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
              autoFocus
              inputProps={{ maxLength: 128 }}
            />
            <TextField
              className={classes.textField}
              id="name"
              label={t('Your Name')}
              type="text"
              defaultValue=""
              onChange={handleNameChanged}
              inputProps={{ maxLength: 128 }}
            />
            <TextField
              className={classes.textField}
              id="email"
              label={t('E-Mail')}
              type="email"
              defaultValue=""
              onChange={handleEmailChanged}
              inputProps={{ maxLength: 128 }}
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
    </div>
  )
})

export default NewTichel
