import { gql, useMutation } from '@apollo/client'

const MUTATION = gql`
  mutation NewTichel($title: String!) {
    insert_tichel_one(object: { title: $title }) {
      id
    }
  }
`

// [ newTichel, { newTichelData } ]
const useNewTichel = (onCompleted) =>
  useMutation(MUTATION, {
    onCompleted: ({ insert_tichel_one }) => {
      onCompleted({ id: insert_tichel_one.id })
    },
  })

export default useNewTichel
