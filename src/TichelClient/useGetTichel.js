import { gql, useQuery } from '@apollo/client'

const QUERY = gql`
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
`

const useGetTichel = (tichelId) => {
  return useQuery(QUERY, {
    context: {
      headers: {
        'X-Hasura-Tichel-Id': tichelId,
      },
    },
    notifyOnNetworkStatusChange: true,
  })
}

export default useGetTichel
