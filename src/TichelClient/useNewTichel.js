import { gql, useMutation } from '@apollo/client'

const MUTATION = gql`
  mutation NewTichel(
    $title: String!
    $tichelId: uuid!
    $creationId: uuid!
    $name: String!
    $email: String!
  ) {
    insert_tichel_one(
      object: {
        title: $title
        id: $tichelId
        creation_id: $creationId
        participants: { data: { email: $email, name: $name } }
      }
    ) {
      id
      participants {
        id
      }
    }
  }
`

// [ newTichel, { newTichelData } ]
const useNewTichel = (tichelId, onCompleted) =>
  useMutation(MUTATION, {
    context: {
      headers: {
        'X-Hasura-Tichel-Id': tichelId,
      },
    },
    onCompleted: ({ insert_tichel_one }) => {
      onCompleted({
        id: insert_tichel_one.id,
        participantId: insert_tichel_one.participants[0].id,
      })
    },
  })

export default useNewTichel
