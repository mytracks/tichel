import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'
import React, { useReducer } from 'react'
import styled from 'styled-components'
import NewTimeDialog from './NewTimeDialog'
import TichelCanvas from './TichelCanvas'
import useAddParticipation from './TichelClient/useAddParticipation'
import useDeleteParticipation from './TichelClient/useDeleteParticipation'
import useGetTichel from './TichelClient/useGetTichel'
import useNewParticipant from './TichelClient/useNewParticipant'
import changeParticipation from './TichelLogic/changeParticipation'
import newParticipant from './TichelLogic/newParticipant'

const TichelCard = styled(Card)`
  width: 345;
  margin: 20px;
`
const Tichel = ({ match }) => {
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
        const participantId = newParticipant(tichel, name, newParticipantHook)
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

  const handleNewTimeDialogClosed = () => {
    setShowNewTimeDialog(false)
  }

  const id = match.params.id
  const { loading, error } = useGetTichel(id, ({ tichel }) =>
    dispatch({ type: 'tichelLoaded', payload: tichel })
  )
  const [addParticipationHook] = useAddParticipation(id)
  const [deleteParticipationHook] = useDeleteParticipation(id)
  const [newParticipantHook] = useNewParticipant(id)
  const [tichel, dispatch] = useReducer(reducer, null)
  const [showNewTimeDialog, setShowNewTimeDialog] = React.useState(false)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  if (!tichel) {
    return null
  }

  return (
    <TichelCard raised>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {tichel.title.toUpperCase().slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={tichel.title}
        // subheader="September 14, 2016"
      />
      <CardContent>
        <div className="Tichel">
          <TichelCanvas
            tichel={tichel}
            onParticipationChange={handleParticipationChanged}
            onNewParticipant={handleNewParticipant}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenNewTimeDialog}
          >
            New Time
          </Button>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <NewTimeDialog
        open={showNewTimeDialog}
        onClose={handleNewTimeDialogClosed}
      />
    </TichelCard>
  )
}

export default Tichel
