import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'
import React, { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { getYourTichels } from '../../utils/storage'
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

const Tichels = withStyles(styles)(({ classes }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const handleClick = (tichel) => {
    history.push('/tichel/' + tichel.guid)
  }

  const tichels = getYourTichels()

  useEffect(() => {
    document.title = t('T_YOUR_TICHELS')
  })

  return (
    <>
      <TichelAppBar title={t('T_YOUR_TICHELS')} />
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Trans>Title</Trans>
                </TableCell>
                <TableCell align="right">
                  <Trans>T_CREATED_AT</Trans>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tichels.map((tichel) => (
                <TableRow key={tichel.guid}>
                  <TableCell component="th" scope="row">
                    <Link onClick={() => handleClick(tichel)}>
                      {tichel.title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {tichel.createdAt && moment(tichel.createdAt).format('LLL')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
})

export default Tichels
