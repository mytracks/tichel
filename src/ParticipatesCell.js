import React from 'react'

const ParticipatesCell = ({ type, clickHandler = () => {} }) => {
  const styles = () => {
    if (type === 1) {
      return {
        backgroundColor: 'green',
      }
    }

    return null
  }

  const onClick = () => {
    console.log('Click!!!')
    clickHandler()
  }

  return (
    <div className="ParticipatesCell" onClick={onClick}>
      <div className="ParticipatesCell__Selection" style={styles()} />
    </div>
  )
}

export default ParticipatesCell
