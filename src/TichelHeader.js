import React from 'react'
import DateCell from './DateCell'
import EmptyCell from './EmptyCell'

const TichelHeader = ({ tichel }) => {
  return (
    <React.Fragment>
      <EmptyCell />
      {tichel.times.map((time) => (
        <DateCell key={time.id} start={time.start} end={time.end} />
      ))}
    </React.Fragment>
  )
}

export default TichelHeader
