import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import TichelCanvas from './TichelCanvas';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const createGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
 {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const GET_TICHEL = gql`
{
  tichels {
    title
    id
    times {
      start
      end
      id
      participations {
        type
        id
        participant {
          id
        }
      }
    }
    participants {
      name
      id
    }
  }
}
`;

const ADD_PARTICIPATION = gql`
  mutation AddParticipation($participantId: uuid!, $timesId: uuid!) {
    insert_participants2times_one(object: {participant_id: $participantId, times_id: $timesId, type: 1}) {
      id
    }
  }
`;

const DELETE_PARTICIPATION = gql`
  mutation DeleteParticipation($id: uuid!) {
    delete_participants2times_by_pk(id: $id) {
      id
    }
  }
`;

const NEW_PARTICIPANT = gql`
  mutation NewParticipant($participantId: uuid!, $name: String!, $tichelId: uuid!) {
    insert_participants_one(object: {id: $participantId, name: $name, tichel_id: $tichelId}) {
      id
    }
  }
`;

const TichelCard = styled(Card)`
  width: 345;
  margin: 20px;
`


const Tichel = ({ match }) => {
  const changeParticipation = (participant, time) => {
    setTichel( currentTichel => {
      let times = []

      for (const t of currentTichel.times) {
        if (t !== time) {
          times.push(t)
        }
        else {
          let participations = []
          let didParticipate = false
          for (const participation of time.participations) {
            if (participation.participant.id !== participant.id) {
              participations.push(participation)
            }
            else {
              // participant already takes part
              didParticipate = true
              deleteParticipation({ variables: { id: participation.id } });
            }
          }

          if (!didParticipate) {
            let newParticipation = {
              type: 1,
              participant: {
                id: participant.id
              }
            }

            participations.push(newParticipation)

            addParticipation({ variables: { participantId: participant.id, timesId: time.id } });
          }

          let newTime = {...t}
          newTime.participations = participations

          times.push(newTime)
        }
      }

      return {
        title: currentTichel.title,
        id: currentTichel.id,
        times: times,
        participants: currentTichel.participants
      }
    })
  }

  const participationChanged = (participant, time) => {
    console.log(`Tichel: ${participant.name}: Time ${time.start.toString()} clicked. ${tichel.title}`)
    changeParticipation(participant, time)
  }

  const handleNewParticipant = (name) => {
    console.log(`New participant ${name}`)

    setTichel(currentTichel => { 
      const participantId = createGuid()
      newParticipant({ variables: { participantId: participantId, name: name, tichelId: currentTichel.id } });

      return {
        title: currentTichel.title,
        id: currentTichel.id,
        times: currentTichel.times,
        participants: [...currentTichel.participants, {
          name: name,
          id: participantId
        }]
      }})
  }

  const [tichel, setTichel] = useState()
  const id = match.params.id;

  const { loading, error, data } = useQuery(GET_TICHEL, {
      context: { 
        headers: { 
          "X-Hasura-Tichel-Id": id
        } 
      },
      onCompleted: (data) => { setTichel(data.tichels[0]); console.log("tichel loaded") }
  })

  const [ addParticipation, { addParticipationData } ] = useMutation(ADD_PARTICIPATION, {
      context: { 
        headers: { 
          "X-Hasura-Tichel-Id": id
        } 
      }
  });

  const [ deleteParticipation, { deleteParticipationData } ] = useMutation(DELETE_PARTICIPATION, {
      context: { 
        headers: { 
          "X-Hasura-Tichel-Id": id
        } 
      }
  });

  const [ newParticipant, { newParticipantData } ] = useMutation(NEW_PARTICIPANT, {
      context: { 
        headers: { 
          "X-Hasura-Tichel-Id": id
        } 
      }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!tichel) {
    return null
  }

  return (
    <TichelCard raised>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {tichel.title.toUpperCase().slice(0,1)}
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
      <TichelCanvas tichel={tichel} onParticipationChange={participationChanged} onNewParticipant={handleNewParticipant}/>      
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
  );
}

export default Tichel