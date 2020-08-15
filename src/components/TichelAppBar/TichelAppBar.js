import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { useTichelContext } from '../../providers/TichelProvider'
import TichelDrawer from '../TichelDrawer/TichelDrawer'

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
})

const TichelAppBar = withStyles(styles)(({ classes }) => {
  const [showMenu, setShowMenu] = useState(false)
  const tichel = useTichelContext()

  const handleMenuClose = () => {
    setShowMenu(false)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {tichel.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <TichelDrawer open={showMenu} onClose={handleMenuClose} />
    </>
  )
})

export default TichelAppBar
