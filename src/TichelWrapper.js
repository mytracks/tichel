import React from 'react'
import { TichelProvider } from './providers/TichelProvider'
import Tichel from './Tichel'

const TichelWrapper = ({ match }) => {
  const id = match.params.id

  console.log('TichelWrapper')

  return (
    <TichelProvider id={id}>
      <Tichel />
    </TichelProvider>
  )
}

export default TichelWrapper
