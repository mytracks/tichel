import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import useNewTichel from './TichelClient/useNewTichel'

const NewTichel = (props) => {
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')

  const handleTitleChanged = (event) => {
    setTitle(event.target.value)
  }

  const handleNewTichel = (event) => {
    newTichel({ variables: { title: title } })
    event.preventDefault()
  }

  const tichelCreated = ({ id }) => {
    setId(id)
  }

  const [newTichel] = useNewTichel(tichelCreated)

  if (id) {
    return <Redirect to={'/tichel/' + id} />
  }

  return (
    <div>
      <form onSubmit={handleNewTichel}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChanged} />
        </label>
        <input type="submit" value="Create" />
      </form>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  )
}

export default NewTichel
