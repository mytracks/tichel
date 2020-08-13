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

// { loading, error, data }
const useGetTichel = (tichelId, onCompleted) => {
  return useQuery(QUERY, {
    context: {
      headers: {
        'X-Hasura-Tichel-Id': tichelId,
      },
    },
    notifyOnNetworkStatusChange: true,
    // pollInterval: 5000,
    // onCompleted: ({ tichels }) => {
    //   onCompleted({ tichel: tichels[0] })
    // },
  })
}

export default useGetTichel
