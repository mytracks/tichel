import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import GavelIcon from '@material-ui/icons/Gavel'
import ListIcon from '@material-ui/icons/List'
import MenuIcon from '@material-ui/icons/Menu'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    padding: '0px 12px 0px 0px',
  },
})

const TichelAppBar = withStyles(styles)(({ classes, title }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const history = useHistory()

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenUrl = (url) => {
    history.push(url)

    closeMenu()
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    closeMenu()
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            aria-label="main menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleOpenUrl('/new')}>
              <AddIcon className={classes.menuIcon} />
              <Trans>New Tichel</Trans>
            </MenuItem>
            <MenuItem onClick={() => handleOpenUrl('/tichels')}>
              <ListIcon className={classes.menuIcon} />
              <Trans>T_YOUR_TICHELS</Trans>
            </MenuItem>
            <MenuItem onClick={() => handleOpenUrl('/licenses')}>
              <GavelIcon className={classes.menuIcon} />
              <Trans>Open Source Licenses</Trans>
            </MenuItem>
            <MenuItem onClick={() => handleOpenUrl('/contact')}>
              <PersonOutlineIcon className={classes.menuIcon} />
              <Trans>T_CONTACT</Trans>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
})

export default TichelAppBar
