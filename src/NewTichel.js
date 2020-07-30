import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
} from '@material-ui/pickers';

const NEW_TICHEL = gql`
  mutation NewTichel($title: String!) {
    insert_tichel_one(object: {title: $title}) {
      id
    }
  }
`;

const NewTichel = (props) => {
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')

  const handleTitleChanged = (event) => {
    setTitle(event.target.value)
  }

  const handleNewTichel = (event) => {
    newTichel({ variables: { title: title } });
    event.preventDefault();
  }

  const tichelCreated = (data) => {
    const id = data.insert_tichel_one.id
    //alert('A Tichel with title ' + title + ' and id ' + JSON.stringify(id) + ' was created.');
    setId(id)
  }

  const [ newTichel, { newTichelData } ] = useMutation(NEW_TICHEL, {
    onCompleted: tichelCreated
  });

  const [selectedDate, handleDateChange] = useState(moment());

  if (id) {
    return <Redirect to={"/tichel/"+id} />
  }

  return (
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                Welcome to Tichel
                </Typography>
            </Toolbar>
        </AppBar>

      {/* <DatePicker value={selectedDate} onChange={handleDateChange} /> */}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TimePicker value={selectedDate} onChange={handleDateChange} />
      </MuiPickersUtilsProvider>
      {/* <DateTimePicker value={selectedDate} onChange={handleDateChange} /> */}
        </div>

    /* <form onSubmit={handleNewTichel}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChanged} />
      </label>
      <input type="submit" value="Create" />
    </form>
   <Button variant="contained" color="primary">
      Hello World
    </Button> 
    </div> */
  );
}

export default NewTichel