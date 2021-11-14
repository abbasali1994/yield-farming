import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import bigNumber from 'bignumber.js';
import useStyles from './index.style';
import BorderLinearProgress from '../TokenStatusCard/BorderLineProgress';
import { truncateDecimals } from '../../constants';

const StakeCard = (props) => {
  const classes = useStyles();

  const getProperFormat = () => {
    if (props.tokensLeftToFarm >= 1000000) {
      return `${truncateDecimals(props.tokensLeftToFarm / (10 ** 6), 2)}M`;
    } else if (props.tokensLeftToFarm >= 100000) {
      return `${truncateDecimals(props.tokensLeftToFarm / (10 ** 3), 2)}K`;
    } else if (props.tokensLeftToFarm >= 10000) {
      return `${truncateDecimals(props.tokensLeftToFarm / (10 ** 3), 2)}K`;
    } else if (props.tokensLeftToFarm >= 1000) {
      return `${truncateDecimals(props.tokensLeftToFarm / (10 ** 3), 2)}K`;
    }
    return props.tokensLeftToFarm;
  };

  return (
    <Card className={classes.cardHeight}>
      <CardContent>
        <div className={classes.flexDiv}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex' }}>
              <Grid item md={4}>
                <Typography className={classes.cardTitle}>
                  My Stake
                  <span>
                    <IconButton onClick={() => {
                      props.getStakeCardBalance();
                      props.getPoolStatus();
                    }}><RefreshIcon color="primary" /></IconButton>
                  </span>
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography style={{
                  lineHeight: 2,
                  marginLeft: 9,
                  fontSize: 14,
                  textAlign: 'end'
                }} className={classes.cardContentLight}>Last Updated on: {props.currentDate}</Typography>
              </Grid>
            </div>
            <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Uni-V2 Tokens Staked</Typography>
              <Typography className={classes.cardContentDark}>{new bigNumber(props.lpTokensStaked).toFixed(8)}</Typography>
            </div>
            <Divider />
            <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Staked Amount (USDT)</Typography>
              <Typography className={classes.cardContentDark}>{props.stakedAmount}</Typography>
            </div>
            <Divider />
            <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Current Value (USDT)</Typography>
              <Typography className={classes.cardContentDark}>{props.currentValue}</Typography>
            </div>
            <Divider />
            <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Rewards Accumulated ( MTLX )</Typography>
              <Typography className={classes.cardContentDark}>{props.mtlxAcc} ({props.mtlxAccInUSDT} USDT)</Typography>
            </div>
            <Divider />
            <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Rewards Claimed</Typography>
              <Typography className={classes.cardContentDark}>{parseFloat(props.rewardsCollected).toFixed(6)}</Typography>
            </div>
            <Divider />
            <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Pool Share %</Typography>
              <Typography className={classes.greenText}>{props.poolShare}</Typography>
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: '90px', }}>
            {/* <div className={classes.valueContainer}>
              <Typography className={classes.yieldText}>APY (based on 24 hrs):</Typography>
              <Typography className={classes.yieldText}>{props.APY}%</Typography>
            </div> */}
            <Typography className={classes.cardTitle} style={{ marginBottom: '33px' }}>MTLX Left to Farm</Typography>
            {/* <div className={classes.flexDiv}>
              <Typography className={classes.cardContentText}>Tokens Left to Farm</Typography>
            </div> */}
            <Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
              <Box minWidth={27}>
                <Typography variant="body2" color="textSecondary">0M</Typography>
              </Box>
              <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={props.tokensPercent} />
              </Box>
              <Box minWidth={24}>
                <Typography variant="body2" color="textSecondary">1M</Typography>
              </Box>
            </Box>
            <Typography className={classes.tip} style={{ marginLeft: `${props.tokensPercent - (props.tokensPercent * 0.1)}%` }}>{getProperFormat()}</Typography>
            <Divider style={{ margin: '-1px 0px 11px' }} />
            {/* <div className={classes.valueContainer}>
              <Typography className={classes.cardContentLight}>Reward Pool Remaining</Typography>
              <Typography className={classes.greenText}>{props.remainingPool} MTLX</Typography>
            </div> */}
            <div className={classes.netValueIncrease}>
              <Typography className={classes.cardContentLight}>Net Value Increase</Typography>
              <Typography className={classes.netValueText}>{props.valueIncrease}%</Typography>
            </div>
            <Typography className={classes.textStyle}>-ve values could be due to Uniswap fees or pool values</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StakeCard;