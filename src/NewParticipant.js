import React from 'react'
import styled from 'styled-components'

const NewParticipant = ({onEnter}) => {
  const DivStyle = styled.div`
    box-sizing: border-box;
    border: solid lightgrey 2px;
    border-radius: 8px;
    margin: 4px;
    padding: 8px;
  `

  const InputStyle = styled.input`
    border: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;  
  `

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      if (onEnter) {
        onEnter(event.target.value)
        event.target.value = ''
      }
    }
  }

    return (
    <DivStyle key="NewParticpant">
      <InputStyle onKeyDown={handleKeyDown}></InputStyle>
    </DivStyle>
  )
}

export default NewParticipant
