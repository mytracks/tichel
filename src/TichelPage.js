import React from 'react'
import { TichelProvider } from './providers/TichelProvider'
import Tichel from './Tichel'

const TichelPage = ({ match }) => {
  const id = match.params.id

  return (
    <TichelProvider id={id}>
      <Tichel />
    </TichelProvider>
  )
}

export default TichelPage
