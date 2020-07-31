import { gql, useMutation } from '@apollo/client'

const MUTATION = gql`
  mutation AddTime(
    $id: uuid!
    $start: timestamptz!
    $end: timestamptz!
    $tichelId: uuid!
  ) {
    insert_times_one(
      object: { id: $id, start: $start, end: $end, tichel_id: $tichelId }
    ) {
      id
    }
  }
`

const useAddTime = (tichelId) =>
  useMutation(MUTATION, {
    context: {
      headers: {
        'X-Hasura-Tichel-Id': tichelId,
      },
    },
  })

export default useAddTime
