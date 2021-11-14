import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import logo from '../../assets/logo.svg'
import Paper from '@material-ui/core/Paper';
import useStyles from './index.style';
import { networkName } from '../../constants';

const AppHeader = (props) => {
  const classes = useStyles();

  const onImageClick = () => {
    window.open('https://mettalex.com/');
  };

  return (
    <AppBar
      position="fixed"
      className={classes.appbar}
    >
      <Toolbar className={classes.toolbar}>
        <img src={logo} className={classes.logo} alt="logo" onClick={onImageClick} />
        <div className={classes.separator} />
        <div className={classes.flexDiv}>
          <Typography className={classes.versionText}>Version 1.0</Typography>
          <Paper className={classes.networkPaper}>
            <Typography className={classes.networkText}>{networkName}</Typography>
          </Paper>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;