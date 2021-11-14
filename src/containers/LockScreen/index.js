import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppHeader from '../AppHeader/AppHeader';
import metaMask from '../../assets/metamask.svg';
import Lock from '../../assets/lock.svg';
import Arrow from '../../assets/arrow.svg';
import useStyles from './index.style';

const LockScreen = (props) => {

  const isMinHeight = useMediaQuery('(min-height:770px)');

  const classes = useStyles()
  return (
    <React.Fragment>
      <AppHeader />
      <div className={classes.image} style={{ height: isMinHeight && '100%' }}>
        <Grid container className={classes.grid}>
          <Grid container className={classes.grid}>
            <Grid item>
              <Card className={classes.metamaskCard}>
                <Grid container justify="space-between" className={classes.notLogin}>
                  <Grid item style={{ marginBottom: "50px" }}>
                    <img src={metaMask} alt="metamask" width="70%"></img>
                  </Grid>
                  <Grid item>
                    <img src={Lock} alt="lock"></img>
                  </Grid>
                  <Grid item>
                    <Typography style={{
                      fontWeight: "700",
                      padding: "10px"
                    }}>Sign In</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>using Metamask</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid className={classes.arrowImage}>
              <img src={Arrow} alt="arrow" width="80%"></img>
            </Grid>
            <Grid item className={classes.bottomText}>
              <Typography>Exchange wallets cannot participate in this round. To participate, please use a <b>Metamask</b> wallet</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment >
  );
}

export default LockScreen;
