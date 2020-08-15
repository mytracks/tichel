import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { Trans } from 'react-i18next'

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
      <Trans>MADE_HEART_1</Trans>
      <span className={classes.heart}>❤</span>
      <Trans>MADE_HEART_2</Trans>
    </Typography>
  )
})

export default Footer
