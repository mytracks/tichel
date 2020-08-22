import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { Trans } from 'react-i18next'

const styles = (theme) => ({
  pre: {
    'white-space': 'pre-wrap',
  },
})

const Licenses = withStyles(styles)(({ classes, license }) => {
  return (
    <>
      <Typography color="primary" variant="h6">
        {license.name}
      </Typography>
      <Typography variant="body2">
        <Trans>Version:</Trans> {license.version}
      </Typography>
      <Typography variant="body2">
        <Trans>License:</Trans> {license.license}
      </Typography>
      {license.author && (
        <Typography variant="body2">
          <Trans>Author:</Trans> {license.author}
        </Typography>
      )}
      {license.source && (
        <Typography variant="body2">
          <Trans>Source:</Trans> {license.source}
        </Typography>
      )}
      {license.repository && (
        <Typography variant="body2">
          <Trans>Repository:</Trans> {license.repository}
        </Typography>
      )}
      {license.licenseText && (
        <Typography variant="body2" component="div">
          <pre className={classes.pre}>{license.licenseText}</pre>
        </Typography>
      )}
      <br />
    </>
  )
})

export default Licenses
