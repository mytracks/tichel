import { gql, useMutation } from '@apollo/client'

const MUTATION = gql`
  mutation AddParticipation(
    $id: uuid!
    $participantId: uuid!
    $timesId: uuid!
  ) {
    insert_participants2times_one(
      object: {
        id: $id
        participant_id: $participantId
        times_id: $timesId
        type: 1
      }
    ) {
      id
    }
  }
`

// [ addParticipation, { addParticipationData } ]
const useAddParticipation = (tichelId) =>
  useMutation(MUTATION, {
    context: {
      headers: {
        'X-Hasura-Tichel-Id': tichelId,
      },
    },
  })

export default useAddParticipation
