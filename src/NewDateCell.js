import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: solid lightgrey 2px;
  border-radius: 8px;
  margin: 4px;
  padding: 8px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  font-size: 2rem;
  vertical-align: middle;
`

const NewDateCell = (props) => {
  return <StyledDiv>+</StyledDiv>
}

export default NewDateCell
