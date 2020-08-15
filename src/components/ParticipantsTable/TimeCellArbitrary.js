import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = (theme) => ({
  root: {},
  day: {
    fontSize: '0.8em',
  },
  time: {
    fontSize: '0.8em',
  },
  year: {
    fontSize: '0.8em',
  },
  yearSameYear: {
    fontSize: '1.2em',
  },
  dayOfWeek: {
    fontSize: '0.8em',
    color: 'lightgrey',
  },
})

const TimeCellArbitrary = withStyles(styles)(
  ({ classes, start, end, config }) => {
    return (
      <>
        <Grid item xs={2}>
          {config.sameYear && (
            <>
              <Typography className={classes.yearSameYear} align="center">
                {start.format('YYYY')}
              </Typography>
            </>
          )}
          {!config.sameYear && (
            <>
              <Typography className={classes.year} align="center">
                {start.format('YYYY')}
              </Typography>
              <Typography className={classes.year} align="center">
                {end.format('YYYY')}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="center">
            <Typography className={classes.dayOfWeek}>
              {start.format('ddd')}
            </Typography>
            &nbsp;
            <Typography className={classes.day}>
              {start.format('MMM Do')}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography className={classes.dayOfWeek}>
              {end.format('ddd')}
            </Typography>
            &nbsp;
            <Typography className={classes.day}>
              {end.format('MMM Do')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.time} align="center">
            {start.format('HH:mm')}
          </Typography>
          <Typography className={classes.time} align="center">
            {end.format('HH:mm')}
          </Typography>
        </Grid>
      </>
    )
  }
)

export default TimeCellArbitrary
