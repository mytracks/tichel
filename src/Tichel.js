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
import React, { useReducer, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ParticipantsTable from './components/ParticipantsTable/ParticipantsTable'
import NewParticipantDialog from './NewParticipantDialog'
import NewTimeDialog from './NewTimeDialog'
import useAddParticipation from './TichelClient/useAddParticipation'
import useAddTime from './TichelClient/useAddTime'
import useDeleteParticipation from './TichelClient/useDeleteParticipation'
import useGetTichel from './TichelClient/useGetTichel'
import useNewParticipant from './TichelClient/useNewParticipant'
import addTime from './TichelLogic/addTime'
import changeParticipation from './TichelLogic/changeParticipation'
import newParticipant from './TichelLogic/newParticipant'

const styles = (theme) => ({
  root: {},
  button: {
    margin: '4px',
  },
  cardContent: {
    margin: 'auto',
  },
})

const Tichel = withStyles(styles)(({ classes, match }) => {
  const { t } = useTranslation()

  const reducer = (currentTichel, action) => {
    switch (action.type) {
      case 'tichelLoaded':
        return action.payload
      case 'changeParticipation':
        const participant = action.payload.participant
        const time = action.payload.time
        const newTimes = changeParticipation(
          currentTichel.times,
          participant,
          time,
          addParticipationHook,
          deleteParticipationHook
        )
        return {
          ...currentTichel,
          times: newTimes,
        }
      case 'newParticipant':
        const name = action.payload.name
        const participantId = newParticipant(
          currentTichel,
          name,
          newParticipantHook
        )
        return {
          ...currentTichel,
          participants: [
            ...currentTichel.participants,
            {
              name: name,
              id: participantId,
            },
          ],
        }
      case 'addTime':
        const { start, end } = action.payload
        const timeId = addTime(currentTichel, start, end, addTimeHook)

        return {
          ...currentTichel,
          times: [
            ...currentTichel.times,
            { start: start, end: end, id: timeId, participations: [] },
          ],
        }
      default:
        throw new Error()
    }
  }

  const handleParticipationChanged = (participant, time) => {
    dispatch({
      type: 'changeParticipation',
      payload: { participant: participant, time: time },
    })
  }

  const handleNewParticipant = (name) => {
    dispatch({ type: 'newParticipant', payload: { name: name } })
  }

  const handleOpenNewTimeDialog = () => {
    setShowNewTimeDialog(true)
  }

  const handleNewTimeDialogCancel = () => {
    setShowNewTimeDialog(false)
  }

  const handleNewTimeDialogCreate = ({ start, end }) => {
    setShowNewTimeDialog(false)
    dispatch({ type: 'addTime', payload: { start: start, end: end } })
  }

  const handleOpenNewParticipantDialog = () => {
    setShowNewParticipantDialog(true)
  }

  const handleNewParticipantDialogCancel = () => {
    setShowNewParticipantDialog(false)
  }

  const handleNewParticipantDialogCreate = (name) => {
    setShowNewParticipantDialog(false)
    dispatch({ type: 'newParticipant', payload: { name: name } })
  }

  const handleCopyToClipboard = () => {
    let getUrl = window.location
    let baseUrl = getUrl.protocol + '//' + getUrl.host
    let url = `${baseUrl}/tichel/${tichel.id}`
    copyToClipboard(url)
  }

  const id = match.params.id
  const { loading, error } = useGetTichel(id, ({ tichel }) =>
    dispatch({ type: 'tichelLoaded', payload: tichel })
  )
  const [addParticipationHook] = useAddParticipation(id)
  const [deleteParticipationHook] = useDeleteParticipation(id)
  const [newParticipantHook] = useNewParticipant(id)
  const [addTimeHook] = useAddTime(id)
  const [tichel, dispatch] = useReducer(reducer, null)
  const [showNewTimeDialog, setShowNewTimeDialog] = useState(false)
  const [autoShowNewTimeDialog, setAutoShowNewTimeDialog] = useState(true)
  const [showNewParticipantDialog, setShowNewParticipantDialog] = useState(
    false
  )

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  if (!tichel) {
    return null
  }

  if (tichel.times.length === 0 && autoShowNewTimeDialog) {
    setShowNewTimeDialog(true)
    setAutoShowNewTimeDialog(false)
  }

  return (
    <div>
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
              {tichel.times.length > 0 && (
                <ParticipantsTable
                  tichel={tichel}
                  onParticipationChange={handleParticipationChanged}
                />
                // <TichelCanvas
                //   tichel={tichel}
                //   onParticipationChange={handleParticipationChanged}
                //   onNewParticipant={handleNewParticipant}
                // />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleOpenNewTimeDialog}
              >
                <Trans>Add another option</Trans>
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
          onCancel={handleNewTimeDialogCancel}
          onCreate={handleNewTimeDialogCreate}
        />
        <NewParticipantDialog
          open={showNewParticipantDialog}
          onCancel={handleNewParticipantDialogCancel}
          onCreate={handleNewParticipantDialogCreate}
        />
      </Card>
    </div>
  )
})

export default Tichel
