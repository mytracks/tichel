import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation DeleteParticipation($id: uuid!) {
    delete_participants2times_by_pk(id: $id) {
      id
    }
  }
`;

//  [ deleteParticipation, { deleteParticipationData } ]
const useDeleteParticipation = (tichelId) =>
  useMutation(MUTATION, {
      context: { 
          headers: { 
              "X-Hasura-Tichel-Id": tichelId
          }
      }
  })


export default useDeleteParticipation