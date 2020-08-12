import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'

const styles = (theme) => ({
  root: {},
  day: {
    fontSize: '1.2em',
  },
  time: {
    fontSize: '0.8em',
  },
  year: {
    fontSize: '0.8em',
  },
  month: {
    fontSize: '0.8em',
    fontWeight: 'bold',
  },
  monthCurrentYear: {
    fontSize: '1.2em',
  },
  dayOfWeek: {
    fontSize: '1.2em',
    color: 'lightgrey',
  },
})

const TimeCellSameMonth = withStyles(styles)(
  ({ classes, start, end, config }) => {
    const { t } = useTranslation()

    return (
      <>
        <Grid item xs={2}>
          {config.currentYear && (
            <>
              <Typography className={classes.monthCurrentYear} align="center">
                {start.format('MMM')}
              </Typography>
            </>
          )}
          {!config.currentYear && (
            <>
              <Typography className={classes.month} align="center">
                {start.format('MMM')}
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
              {start.format('Do')}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography className={classes.dayOfWeek}>
              {end.format('ddd')}
            </Typography>
            &nbsp;
            <Typography className={classes.day}>{end.format('Do')}</Typography>
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

export default TimeCellSameMonth
