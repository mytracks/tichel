import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

const TichelDrawer = withStyles(styles)(({ classes, open, onClose }) => {
  const { t } = useTranslation()
  const [redirectNewTichel, setRedirectNewTichel] = useState(false)
  const [redirectLicenses, setRedirectLicenses] = useState(false)

  const toggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    //setOpen(!open)
    onClose()
  }

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem button key="New" onClick={() => setRedirectNewTichel(true)}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={t('New')} />
        </ListItem>
        <ListItem
          button
          key="Licenses"
          onClick={() => setRedirectLicenses(true)}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={t('Licenses')} />
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>
  )

  if (redirectNewTichel) {
    return <Redirect to={'/'} />
  }

  if (redirectLicenses) {
    return <Redirect to={'/licenses'} />
  }

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer()}>
      {list()}
    </Drawer>
  )
})

export default TichelDrawer
