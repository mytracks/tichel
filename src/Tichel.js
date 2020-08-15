import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import LinkIcon from '@material-ui/icons/Link'
import RefreshIcon from '@material-ui/icons/Refresh'
import copyToClipboard from 'copy-to-clipboard'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import InviteDialog from './components/InviteDialog/InviteDialog'
import ParticipantsTable from './components/ParticipantsTable/ParticipantsTable'
import TichelAppBar from './components/TichelAppBar/TichelAppBar'
import NewParticipantDialog from './NewParticipantDialog'
import NewTimeDialog from './NewTimeDialog'
import {
  useDispatchContext,
  useTichelContext,
} from './providers/TichelProvider'
import { getCreationId, getSelfId } from './utils/storage'

const styles = (theme) => ({
  root: {
    margin: 'auto',
    padding: '0px',
  },
  card: {},
  button: {
    margin: '8px',
  },
  cardContent: {
    padding: '4px',
    margin: 'auto',
  },
})

const Tichel = withStyles(styles)(({ classes }) => {
  const tichel = useTichelContext()
  const dispatch = useDispatchContext()

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

  const handleRefresh = () => {
    dispatch({ type: 'refresh', payload: {} })
  }

  const handleInvite = () => {
    setShowInviteDialog(true)
  }

  const handleInviteDialogClose = () => {
    setShowInviteDialog(false)
  }

  const [showNewTimeDialog, setShowNewTimeDialog] = useState(false)
  const [autoShowNewTimeDialog, setAutoShowNewTimeDialog] = useState(true)
  const [showNewParticipantDialog, setShowNewParticipantDialog] = useState(
    false
  )
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  if (tichel?.times.length === 0 && autoShowNewTimeDialog) {
    setShowNewTimeDialog(true)
    setAutoShowNewTimeDialog(false)
  }

  if (!tichel) {
    return null
  }

  let selfId = getSelfId(tichel.id)
  let canAddSelf =
    selfId === null ||
    tichel.participants.filter((p) => p.id === selfId).length === 0

  let creationId = getCreationId(tichel.id)
  let canAddTimes = creationId !== null

  return (
    <>
      <TichelAppBar />

      <Container maxWidth="md" className={classes.root}>
        {/* <CardHeader title={tichel.title} /> */}
        <CardContent className={classes.cardContent}>
          <Grid container justify="center" direction="row" alignItems="center">
            <Grid item xs={12}>
              {tichel.times.length > 0 && <ParticipantsTable tichel={tichel} />}
            </Grid>
            {canAddTimes && (
              <Grid item xs={12} align="right">
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenNewTimeDialog}
                  startIcon={<AccessTimeIcon />}
                >
                  <Trans>Add time option</Trans>
                </Button>
              </Grid>
            )}
            {canAddSelf && (
              <Grid item xs={12} align="right">
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenNewParticipantDialog}
                >
                  <Trans>Add yourself</Trans>
                </Button>
              </Grid>
            )}
            {!canAddSelf && (
              <Grid item xs={12} align="right">
                <Button
                  // fullWidth={true}
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  onClick={handleInvite}
                  startIcon={<EmojiPeopleIcon />}
                >
                  <Trans>Invite a friend</Trans>
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Copy Tichel's link to clipboard"
            onClick={handleCopyToClipboard}
          >
            <LinkIcon />
          </IconButton>
          <IconButton aria-label="Reload data" onClick={handleRefresh}>
            <RefreshIcon />
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
        <InviteDialog
          open={showInviteDialog}
          onClose={handleInviteDialogClose}
        />
      </Container>
    </>
  )
})

export default Tichel
