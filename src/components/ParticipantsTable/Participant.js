import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import TimeRow from './TimeRow'

const styles = (theme) => ({
  card: {
    margin: '8px',
  },
})

const Participant = withStyles(styles)(({ classes, times, participant }) => {
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
        {times.map((time) => (
          <TimeRow key={time.id} participant={participant} time={time} />
        ))}
      </CardContent>
    </Card>
  )
})

export default Participant
