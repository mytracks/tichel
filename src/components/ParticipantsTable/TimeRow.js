import { Box, Checkbox, Container, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import {
  getDayMonth,
  getDayOfWeek,
  getHHMM,
  getShortMonth,
} from '../../utils/dateutils'

const styles = (theme) => ({
  root: {
    border: 'solid lightgrey',
    borderTopWidth: '0px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '1px',
    padding: '4px',
  },
  dateContainer: {
    width: '100px',
  },
  day: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: '0px',
    margin: '-0.2em 0px -0.2em 0px',
  },
  month: {
    fontSize: '0.8em',
  },
  dayOfWeek: {
    fontSize: '0.8em',
    color: 'lightgrey',
  },
  checkboxContainer: {
    width: '100px',
  },
})

const TimeRow = withStyles(styles)(
  ({ classes, time, participationType, onParticipationChange }) => {
    const handleParticipationChange = () => {
      onParticipationChange()
    }

    const start = new Date(time.start)
    const end = new Date(time.end)

    return (
      <Box className={classes.root} display="flex">
        <Container className={classes.dateContainer}>
          <Typography className={classes.month} align="center">
            {getShortMonth(start)}
          </Typography>
          <Typography className={classes.day} align="center">
            {getDayMonth(start)}
          </Typography>
          <Typography className={classes.dayOfWeek} align="center">
            {getDayOfWeek(start)}
          </Typography>
        </Container>
        <Container>
          <Typography>
            {getHHMM(start)} - {getHHMM(end)}
          </Typography>
        </Container>
        <Container className={classes.checkboxContainer}>
          <Checkbox
            className={classes.greenCheckbox}
            checked={participationType !== 0}
            onClick={handleParticipationChange}
            color="primary"
          ></Checkbox>
        </Container>
      </Box>
    )
  }
)

export default TimeRow
