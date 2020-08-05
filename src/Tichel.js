import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'
import copyToClipboard from 'copy-to-clipboard'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import ParticipantsTable from './components/ParticipantsTable/ParticipantsTable'
import NewParticipantDialog from './NewParticipantDialog'
import NewTimeDialog from './NewTimeDialog'
import { useTichelContext } from './providers/TichelProvider'

const styles = (theme) => ({
  root: {},
  button: {
    margin: '4px',
  },
  cardContent: {
    margin: 'auto',
  },
})

const Tichel = withStyles(styles)(({ classes }) => {
  const tichel = useTichelContext()

  const handleOpenNewTimeDialog = () => {
    setShowNewTimeDialog(true)
  }

  const handleNewTimeDialogClose = () => {
    setShowNewTimeDialog(false)
  }

  const handleOpenNewParticipantDialog = () => {
    setShowNewParticipantDialog(true)
  }

  const handleNewParticipantDialogClose = () => {
    setShowNewParticipantDialog(false)
  }

  const handleCopyToClipboard = () => {
    const getUrl = window.location
    const baseUrl = getUrl.protocol + '//' + getUrl.host
    const url = `${baseUrl}/tichel/${tichel.id}`
    copyToClipboard(url)
  }

  const [showNewTimeDialog, setShowNewTimeDialog] = useState(false)
  const [autoShowNewTimeDialog, setAutoShowNewTimeDialog] = useState(true)
  const [showNewParticipantDialog, setShowNewParticipantDialog] = useState(
    false
  )

  if (tichel?.times.length === 0 && autoShowNewTimeDialog) {
    setShowNewTimeDialog(true)
    setAutoShowNewTimeDialog(false)
  }

  if (!tichel) {
    return null
  }

  return (
    <Container maxWidth="sm">
      <Card raised>
        <CardHeader
          // avatar={
          //   <Avatar aria-label="recipe">
          //     {tichel.title.toUpperCase().slice(0, 1)}
          //   </Avatar>
          // }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={tichel.title}
          // subheader="September 14, 2016"
        />
        <CardContent className={classes.cardContent}>
          <Grid container justify="center">
            <Grid item xs={12}>
              {tichel.times.length > 0 && <ParticipantsTable tichel={tichel} />}
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleOpenNewTimeDialog}
              >
                <Trans>Add time option</Trans>
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleOpenNewParticipantDialog}
              >
                <Trans>Add yourself</Trans>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Copy Tichel's link to clipboard"
            onClick={handleCopyToClipboard}
          >
            <LinkIcon />
          </IconButton>
        </CardActions>
        <NewTimeDialog
          open={showNewTimeDialog}
          onClose={handleNewTimeDialogClose}
        />
        <NewParticipantDialog
          open={showNewParticipantDialog}
          onClose={handleNewParticipantDialogClose}
        />
      </Card>
    </Container>
  )
})

export default Tichel
