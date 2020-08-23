import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { default as React } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import TichelAppBar from '../TichelAppBar/TichelAppBar'

const styles = (theme) => ({
  paper: {
    margin: '20px auto auto auto',
    maxWidth: '800px',
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.sendondary,
  },
})

const Contact = withStyles(styles)(({ classes }) => {
  const { t } = useTranslation()

  return (
    <>
      <TichelAppBar title={t('T_CONTACT')} />
      <Paper className={classes.paper}>
        <Typography variant="body1">
          Dr. Dirk Stichling
          <br />
          Anne-Frank-Str. 14b
          <br />
          D-33106 Paderborn
          <br />
          <Trans>T_GERMANY</Trans>
          <br />
          <Trans>T_TEL</Trans>
          <br />
          <Trans>T_EMAIL</Trans>
        </Typography>
        <br />
        <Typography variant="body1">
          <Trans>T_LEGAL_STUFF</Trans>
        </Typography>
      </Paper>
    </>
  )
})

export default Contact
