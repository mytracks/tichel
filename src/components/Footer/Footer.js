import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = (theme) => ({
  footer: {
    margin: '60px 0px 60px 0px',
    backgoundColor: 'red',
  },
  heart: {
    color: 'red',
  },
})

const Footer = withStyles(styles)(({ classes }) => {
  return (
    <Typography className={classes.footer} align="center">
      Made with <span className={classes.heart}>❤</span> by Dirk in Paderborn,
      Germany.
    </Typography>
  )
})

export default Footer
