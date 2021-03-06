import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TichelAppBar from '../TichelAppBar/TichelAppBar'
import License from './License'
import licenses from './oss-licenses.json'

const styles = (theme) => ({
  paper: {
    margin: '20px auto auto auto',
    maxWidth: '800px',
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.sendondary,
  },
})

const Licenses = withStyles(styles)(({ classes }) => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('Open Source Licenses')
  })

  return (
    <>
      <TichelAppBar title={t('Open Source Licenses')} />
      <Paper className={classes.paper}>
        {licenses.map((license) => (
          <License key={license.name + license.version} license={license} />
        ))}
      </Paper>
    </>
  )
})

export default Licenses
