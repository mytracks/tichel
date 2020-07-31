import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'
import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import TichelCanvas from './TichelCanvas'
import useAddParticipation from './TichelClient/useAddParticipation'
import useDeleteParticipation from './TichelClient/useDeleteParticipation'
import useGetTichel from './TichelClient/useGetTichel'
import useNewParticipant from './TichelClient/useNewParticipant'

const TichelCard = styled(Card)`
  width: 345;
  margin: 20px;
`
const Tichel = ({ match }) => {
  const changeParticipation = (participant, time) => {
    setTichel((currentTichel) => {
      let times = []

      for (const t of currentTichel.times) {
        if (t !== time) {
          times.push(t)
        } else {
          let participations = []
          let didParticipate = false
          for (const participation of time.participations) {
            if (participation.participant.id !== participant.id) {
              participations.push(participation)
            } else {
              // participant already takes part
              didParticipate = true
              deleteParticipation({ variables: { id: participation.id } })
            }
          }

          if (!didParticipate) {
            let newParticipation = {
              type: 1,
              id: uuid(),
              participant: {
                id: participant.id,
              },
            }

            participations.push(newParticipation)

            addParticipation({
              variables: { participantId: participant.id, timesId: time.id },
            })
          }

          let newTime = { ...t }
          newTime.participations = participations

          times.push(newTime)
        }
      }

      return {
        ...currentTichel,
        times: times,
      }
    })
  }

  const participationChanged = (participant, time) => {
    changeParticipation(participant, time)
  }

  const handleNewParticipant = (name) => {
    setTichel((currentTichel) => {
      const participantId = uuid()
      newParticipant({
        variables: {
          participantId: participantId,
          name: name,
          tichelId: currentTichel.id,
        },
      })

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
    })
  }

  const [tichel, setTichel] = useState()
  const id = match.params.id

  const { loading, error } = useGetTichel(id, ({ tichel }) => setTichel(tichel))
  const [addParticipation] = useAddParticipation(id)
  const [deleteParticipation] = useDeleteParticipation(id)
  const [newParticipant] = useNewParticipant(id)

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
            onParticipationChange={participationChanged}
            onNewParticipant={handleNewParticipant}
          />
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
    </TichelCard>
  )
}

export default Tichel
