import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  getDayMonth,
  getDayOfWeek,
  getHHMM,
  getShortMonth,
  getYear,
} from '../../utils/dateutils'

const styles = (theme) => ({
  root: {},
  day: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    padding: '0px',
    margin: '-0.2em 0px -0.2em 0px',
  },
  month: {
    fontSize: '0.8em',
  },
  year: {
    fontSize: '0.8em',
    color: 'red',
  },
  dayOfWeek: {
    fontSize: '0.8em',
    color: 'lightgrey',
  },
  box: {
    margin: 'auto',
  },
})

const TimeCell = withStyles(styles)(({ classes, startString, withYear }) => {
  const { t } = useTranslation()

  const start = new Date(startString)

  return (
    <Grid item xs={4}>
      <Typography className={classes.time} align="center">
        {getHHMM(start)}
      </Typography>
      <Box className={classes.box} align="center">
        <Typography className={classes.day} display="inline">
          {getDayMonth(start)}
        </Typography>{' '}
        <Typography className={classes.dayOfWeek} display="inline">
          {getDayOfWeek(start)}
        </Typography>
      </Box>
      <Typography className={classes.month} align="center">
        {getShortMonth(start)} {withYear && getYear(start)}
      </Typography>
    </Grid>
  )
})

export default TimeCell
