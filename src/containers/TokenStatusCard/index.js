import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import useStyles from './index.style'

const TokenStausCard = (props) => {

  const classes = useStyles();

  return (
    <Card className={classes.cardHeight}>
      <CardContent>
      <Typography className={classes.cardTitle}>Wallet Balance</Typography>            
        <div className={classes.balanceContainer}>
          <div className={classes.flexDiv}>
            <Typography className={classes.cardContentLight}>USDT</Typography>
            <Typography className={classes.cardContentDark}>{props.usdtBalance}</Typography>
          </div>          
          <div className={classes.flexDiv}>
            <Typography className={classes.cardContentLight}>MTLX</Typography>
            <Typography className={classes.cardContentDark}>{props.mtlxBalance}</Typography>
          </div>          
          <div className={classes.flexDiv}>
            <Typography className={classes.cardContentLight}>Uni-V2 </Typography>
            <Typography className={classes.cardContentDark}>{props.lpTokens.toFixed(8)}</Typography>
          </div>                     
        </div> 
      </CardContent>
    </Card>
  );
};

export default TokenStausCard;