import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation NewParticipant($participantId: uuid!, $name: String!, $tichelId: uuid!) {
    insert_participants_one(object: {id: $participantId, name: $name, tichel_id: $tichelId}) {
      id
    }
  }
`;

  // [ deleteParticipation, { deleteParticipationData } ]
const useNewParticipant = (tichelId) =>
  useMutation(MUTATION, {
      context: { 
          headers: { 
              "X-Hasura-Tichel-Id": tichelId
          }
      }
  })


export default useNewParticipant