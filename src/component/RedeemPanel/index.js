import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './index.style';
import { Typography } from '@material-ui/core';

const RedeemPanel = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.buttonContainer}>
        <Button variant="outlined" color="primary" className={classes.buttonStyle} onClick={props.claimMTLXRewards} disabled={props.mtlxRewards === 0}>Claim MTLX Rewards</Button>
        <Button variant="outlined" color="primary" className={classes.redeemButtonStyle} onClick={props.unstakeUSDT} disabled={props.lpTokensStaked === 0}>Exit: Claim and Redeem All</Button>
        <Typography style={{
          textAlign: 'center', color: '#7C7C7D',
          fontWeight: 300,
        }} className={classes.textStyle}>Please use this option to provide liquidity using USDT only</Typography>
      </div>
    </>
  );
};

export default RedeemPanel;