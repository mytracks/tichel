import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import React from 'react'
import TimeRow from './TimeRow'

const styles = (theme) => ({
  card: {
    margin: '8px',
  },
})

const Participant = withStyles(styles)(({ classes, times, participant }) => {
  let config = {
    sameDay: true,
    sameMonth: true,
    sameYear: true,
    currentYear: true,
  }

  if (times && times.length > 0) {
    const currentYear = moment().year()

    for (const time of times) {
      const start = moment(time.start)
      const end = moment(time.end)

      if (
        start.year() !== end.year() ||
        start.month() !== end.month() ||
        start.date() !== end.date()
      ) {
        config.sameDay = false
      }

      if (start.year() !== end.year() || start.month() !== end.month()) {
        config.sameMonth = false
      }

      if (start.year() !== end.year()) {
        config.sameYear = false
      }

      if (start.year() !== currentYear || end.year() !== currentYear) {
        config.currentYear = false
      }
    }
  }

  return (
    <Card className={classes.card} raised>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {participant.name.toUpperCase().slice(0, 1)}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={participant.name}
        // subheader="September 14, 2016"
      />
      <CardContent className={classes.cardContent}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          {times.map((time) => (
            <TimeRow
              key={time.id}
              participant={participant}
              time={time}
              config={config}
            />
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
})

export default Participant
