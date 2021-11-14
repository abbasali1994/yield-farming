import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { TokenAmount, Token, Fetcher, ChainId, Route } from "@uniswap/sdk";
import bigNumber from 'bignumber.js';
import AppHeader from './containers/AppHeader/AppHeader';
import StakeCard from './containers/StakeCard';
import TokenStatusCard from './containers/TokenStatusCard';
import TransactionPanel from './containers/TransactionPanel';
import LPTokensTransaction from './containers/LPTokensTransaction';
import useStyles from './index.style';
import Refresh from './assets/loader.svg';
import { contractAddresses, truncateDecimals, multiplier, usdtMultiplier, networkId, networkName, totalTokens, RewardPoolAddress } from './constants';
import Loader from './assets/loadingIconWhite.bin';
import { ethers } from 'ethers';
import CopyToClipboard from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import TypoGraphy from '@material-ui/core/Typography';
import moment from 'moment';

const App = (props) => {

  const [loading, setLoading] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0.00);
  const [currentValue, setCurrentValue] = useState(0.00);
  const [valueIncrease, setValueIncrease] = useState(0.00);
  const [loadingText, setLoadingText] = useState('Loading');
  const [poolShare, setPoolShare] = useState(0);
  const [usdtBalance, setUSDTBalance] = useState(0);
  const [lpTokens, setLPTokens] = useState(0.00);
  const [APY, setAPY] = useState(0.00);
  const [mtlx, setMTLX] = useState(0.00);
  const [mtlxInUSDT, setMTLXInUSDT] = useState(0.00);
  const [mtlxBalance, setMTLXBalance] = useState(0.00);
  const [remainingPoolRewards, setRemainingPoolRewards] = useState(0.00);
  const [lpTokensStaked, setLPTokensStaked] = useState(0.00);
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState(moment()
    .format('MMM DD YYYY hh:mm a'));
  const [mtlxValue, setMtlxValue] = useState(0.00);
  const [tokensLeftToFarm, setTokensLeftToFarm] = useState(0.00);
  const [tokensPercent, setTokensPercent] = useState(0.00);
  const [rewardsCollected, setRewardsCollected] = useState(0.00);

  const provider = new ethers.providers.InfuraProvider("mainnet", process.env.REACT_APP_INFURA_PROVIDER);

  const getStakedAmount = async (userAddress) => {
    try {
      const response = await fetch(`https://europe-west2-fetch-ai-sandbox.cloudfunctions.net/stake_amount?address='${userAddress}'&network_id='${networkId}'`, {
        method: 'get',
        headers: new Headers({
          'Authorization': `Basic ${process.env.REACT_APP_CLOUD_FUNCTION}`,
          'Content-Type': 'application/json'
        }),
      })
      const result = await response.text()
      const data = JSON.parse(result)
      if (data.result) return data.result[0].sum
      else return null;
    } catch (error) {
      throw new Error(error)
    }
  }

  const getMTLXRewards = async (userAddress) => {
    try {
      const response = await fetch(`https://europe-west2-fetch-ai-sandbox.cloudfunctions.net/mtlx_reward?address='${userAddress}'&network_id='${networkId}'`, {
        method: 'get',
        headers: new Headers({
          'Authorization': `Basic ${process.env.REACT_APP_CLOUD_FUNCTION}`,
          'Content-Type': 'application/json'
        }),
      })
      const result = await response.text()
      const data = JSON.parse(result)
      if (data.result) return data.result[0].sum
      else return null;
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateStakedAmount = async (address, amount, mtlxReward = 0) => {
    try {
      const response = await fetch(`https://europe-west2-fetch-ai-sandbox.cloudfunctions.net/stake_amount`, {
        method: 'post',
        headers: new Headers({
          'Authorization': `Basic ${process.env.REACT_APP_CLOUD_FUNCTION}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          address,
          amount,
          network_id: `${networkId}`,
          mtlx_reward: mtlxReward
        }),
      })
      const result = await response.text()
      const data = JSON.parse(result)
      if (data.result) return data.result
      else return []
    } catch (error) {
      throw new Error(error)
    }
  }

  const getStakeCardBalances = async () => {
    try {
      setLoading(true);
      setLoadingText('Fetching balances...')
      const userInfo = await props.drizzle.contracts.Amplify.methods.userInfo(0, props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
      const usdtToken = new Token(
        ChainId.MAINNET,
        contractAddresses.usdt,
        usdtMultiplier,
        "USDT",
        "USDTether"
      );

      const mtlxToken = new Token(
        ChainId.MAINNET,
        contractAddresses.mtlx,
        multiplier,
        "MTLX",
        "Mettalex"
      );

      Fetcher.fetchPairData(
        usdtToken,
        mtlxToken,
        provider
      ).then(async (pair) => {

        const lpTokensTotalSupply = await props.drizzle.contracts.LP.methods.totalSupply().call();
        const kLast = await props.drizzle.contracts.LP.methods.kLast().call();
        const lpToken = new Token(
          ChainId.MAINNET,
          contractAddresses.lp,
          multiplier,
          await props.drizzle.contracts.LP.methods.symbol().call(),
          await props.drizzle.contracts.LP.methods.name().call()
        );
        const usdt = pair.getLiquidityValue(
          usdtToken,
          new TokenAmount(lpToken, lpTokensTotalSupply.toString()),
          new TokenAmount(lpToken, userInfo.amount),
          true,
          kLast
        );
        const mtlx = pair.getLiquidityValue(
          mtlxToken,
          new TokenAmount(lpToken, lpTokensTotalSupply.toString()),
          new TokenAmount(lpToken, userInfo.amount),
          true,
          kLast
        );
        const route = new Route([pair], mtlxToken);
        const stakedValue = await getStakedAmount(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress);
        if (stakedValue) {
          setStakedAmount(stakedValue);
        } else {
          setStakedAmount(0.00);
        }
        const currentAmount = new bigNumber(usdt.toExact()).plus(new bigNumber(mtlx.toExact()).multipliedBy(route.midPrice.toSignificant(8))).toFixed(2);
        const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
        setCurrentValue(currentAmount);
        const mtlxPerBlock = await props.drizzle.contracts.Amplify.methods.MTLXPerBlock().call();
        const mtlxPrice = route.midPrice.toFixed(3);
        setMtlxValue(mtlxPrice)
        const blocksPerDay = 4 * 60 * 24;
        const totalStacked = await props.drizzle.contracts.LP.methods.balanceOf(contractAddresses.amplify).call();
        const last24HoursYield = parseFloat(mtlxPerBlock / (10 ** multiplier)) * mtlxPrice * blocksPerDay * (stakedValue / parseFloat(totalStacked / (10 ** multiplier)));
        const annualYield = last24HoursYield * 365;
        setAPY(truncateDecimals(((annualYield / stakedValue) * 100), 2));
        setMTLX(new bigNumber(pendingMTLX).div(10 ** multiplier).toNumber());
        // setMTLX(truncateDecimals(pendingMTLX / (10 ** multiplier), 2));
        const mtlxRewardInUSDT = truncateDecimals(parseFloat(truncateDecimals(pendingMTLX / (10 ** multiplier), 8)) * parseFloat(route.midPrice.toSignificant(8)), 8);
        let mtlxRewardsCollected = await getMTLXRewards(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress);
        if (!mtlxRewardsCollected) {
          mtlxRewardsCollected = 0;
        }
        setRewardsCollected(mtlxRewardsCollected);
        if (!stakedValue || stakedValue === 0) {
          setValueIncrease(0);
        } else {
          setValueIncrease((((parseFloat(currentAmount) + parseFloat(mtlxRewardInUSDT) + mtlxRewardsCollected - stakedValue) / stakedValue) * 100).toFixed(3));
          // setValueIncrease((((parseFloat(currentAmount) + parseFloat(mtlxRewardInUSDT) - stakedValue) / stakedValue) * 100).toFixed(3));
        }
        setDate(moment()
          .format('MMM DD YYYY hh:mm a'))
        setMTLXInUSDT(mtlxRewardInUSDT);
        setLPTokensStaked(new bigNumber(userInfo.amount).div(new bigNumber(10 ** 18)).toNumber());
        setLoadingText('Loading');
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getPoolStatus = async () => {
    try {
      const userInfo = await props.drizzle.contracts.Amplify.methods.userInfo(0, props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
      let lpTokenBalanceAmplify = await props.drizzle.contracts.LP.methods.balanceOf(contractAddresses.amplify).call();

      setPoolShare(((parseFloat(userInfo.amount) / lpTokenBalanceAmplify) * 100).toFixed(2));
      const rewardStartBlock = await props.drizzle.contracts.Amplify.methods.startBlock().call();
      const bonusEndBlock = await props.drizzle.contracts.Amplify.methods.bonusEndBlock().call();
      const currentBlock = await window.web3.eth.getBlock('latest');
      const rewardPerBlock = await props.drizzle.contracts.Amplify.methods.MTLXPerBlock().call();
      const bonusMultiplier = await props.drizzle.contracts.Amplify.methods.BONUS_MULTIPLIER().call();
      let tokensLeft = 0;

      if (currentBlock > rewardStartBlock && currentBlock <= bonusEndBlock) {
        tokensLeft = new bigNumber(currentBlock.number).minus(new bigNumber(rewardStartBlock)).multipliedBy(new bigNumber(rewardPerBlock)).multipliedBy(new bigNumber(bonusMultiplier)).toNumber();
      } else if (currentBlock >= bonusEndBlock) {
        const bonusRewards = new bigNumber(bonusEndBlock).minus(new bigNumber(rewardStartBlock)).multipliedBy(new bigNumber(rewardPerBlock)).multipliedBy(new bigNumber(bonusMultiplier));
        const postBonusRewards = new bigNumber(currentBlock.number).minus(new bigNumber(bonusEndBlock)).multipliedBy(new bigNumber(rewardPerBlock));
        tokensLeft = postBonusRewards.plus(bonusRewards);
      }
      const mtlxLeftToFarm = new bigNumber(totalTokens).minus(tokensLeft.div(10 ** 18)).toNumber();
      setTokensLeftToFarm(mtlxLeftToFarm);
      setTokensPercent(100 - ((totalTokens - mtlxLeftToFarm) / totalTokens) * 100);
    }
    catch (e) {
      console.log(e);
    }
  };

  const getWalletBalance = async () => {
    try {
      const usdt = await props.drizzle.contracts.MockERC20.methods.balanceOf(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
      const mtlxTokensAmount = await props.drizzle.contracts.MetalX.methods.balanceOf(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
      const amount = await props.drizzle.contracts.MetalX.methods.balanceOf(RewardPoolAddress).call();
      setRemainingPoolRewards(truncateDecimals(parseFloat(amount) / (10 ** multiplier), 2));
      setMTLXBalance(truncateDecimals(parseFloat(mtlxTokensAmount) / (10 ** multiplier), 2));
      setUSDTBalance(new bigNumber(usdt).div(new bigNumber(10 ** usdtMultiplier)).toString());
    }
    catch (err) {
      console.log(err);
    }
  };

  const getLPTokens = async () => {
    const LPTokensAmount = await props.drizzle.contracts.LP.methods.balanceOf(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
    setLPTokens(new bigNumber(LPTokensAmount).div(10 ** multiplier).toNumber());
    // setLPTokens(truncateDecimals(parseFloat(LPTokensAmount) / (10 ** multiplier), 8));
  };

  const updateAllBalances = async () => {
    getStakeCardBalances();
    getPoolStatus();
    getWalletBalance();
    getLPTokens();
  };

  useEffect(() => {
    if (props.drizzleState.web3.networkId === networkId) {
      updateAllBalances();
    }
    // eslint-disable-next-line
  }, [props.drizzle.web3.eth.accounts.givenProvider.selectedAddress]);

  const isMinHeight = useMediaQuery('(min-height:770px)');

  const onCopy = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  const formatAddress = () => {
    if (!props.drizzle.web3.eth.accounts.givenProvider.selectedAddress) {
      return '...';
    }
    const address = props.drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    const l = address.length;
    return <CopyToClipboard text={address} onCopy={onCopy}>
      <Tooltip title={copied ? "Copied!" : "Click to copy"}>
        <TypoGraphy className={classes.accountNumberText}>{address.slice(0, 9)}...{address.slice(l - 10, l)}</TypoGraphy>
      </Tooltip>
    </CopyToClipboard>
  };

  const renderHeading = () => {
    return <div className={classes.flexDiv}>
      <Grid item md={4}>
        <Typography className={classes.heading}>Amplify</Typography>
      </Grid>
      <Grid item md={4}>
        <Typography className={classes.addressText} style={{ textAlign: 'center', color: 'white', fontWeight: 500 }}>MTLX: {mtlxValue} USDT</Typography>
      </Grid>
      <Grid item md={4}>
        <Paper className={classes.addressBox}>
          <Typography className={classes.addressText}>{formatAddress()}</Typography>
        </Paper>
      </Grid>
    </div>
  };

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formatNumberwOutDecimal = (num) => {
    return parseFloat(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const renderStakeCard = () => (
    <Grid item xs={12}>
      <StakeCard
        stakedAmount={formatNumber(stakedAmount)}
        currentValue={formatNumber(currentValue)}
        valueIncrease={formatNumberwOutDecimal(valueIncrease)}
        getStakeCardBalance={getStakeCardBalances}
        APY={APY}
        mtlxAcc={formatNumber(mtlx)}
        mtlxAccInUSDT={formatNumber(mtlxInUSDT)}
        poolShare={formatNumber(poolShare)}
        lpTokensStaked={lpTokensStaked}
        currentDate={date}
        tokensLeftToFarm={tokensLeftToFarm}
        tokensPercent={tokensPercent}
        rewardsCollected={rewardsCollected}
        remainingPool={formatNumber(remainingPoolRewards)}
      />
    </Grid>
  );

  const renderTokenStatusCard = () => (
    <Grid item xs={12}>
      <TokenStatusCard
        usdtBalance={formatNumber(usdtBalance)}
        mtlxBalance={formatNumber(mtlxBalance)}
        lpTokens={lpTokens}
      />
    </Grid>
  );

  const renderTransactioPanel = () => (
    <Grid style={{ padding: '16px 0 16px 16px' }} item xs={6}>
      <TransactionPanel
        drizzle={props.drizzle}
        setLoading={setLoading}
        drizzleState={props.drizzleState}
        updateBalances={updateAllBalances}
        setLoadingText={setLoadingText}
        stakedAmount={stakedAmount}
        usdtBalance={parseFloat(usdtBalance)}
        address={props.drizzle.web3.eth.accounts.givenProvider.selectedAddress}
        mtlxRewards={mtlx}
        updateStakedAmount={updateStakedAmount}
        lpTokensStaked={lpTokensStaked}
        getStakedAmount={getStakedAmount}
        mtlxValue={mtlxValue}
      />
    </Grid>
  );

  const renderLPTokensTransaction = () => (
    <Grid item xs={6}>
      <LPTokensTransaction
        drizzle={props.drizzle}
        address={props.drizzle.web3.eth.accounts.givenProvider.selectedAddress}
        updateBalances={updateAllBalances}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
        stakedAmount={stakedAmount}
        lpTokens={lpTokens}
        mtlxRewards={mtlx}
        updateStakedAmount={updateStakedAmount}
        lpTokensStaked={lpTokensStaked}
        getStakedAmount={getStakedAmount}
        mtlxValue={mtlxValue}
      />
    </Grid>
  );

  const renderBody = () => (
    <Container className={classes.containerStyle}>
      {renderHeading()}
      <br />
      <Grid container spacing={4}>
        {renderStakeCard()}
      </Grid>
      <Grid container spacing={4}>
        {renderTransactioPanel()}
        {renderLPTokensTransaction()}
      </Grid>
      <Grid container spacing={4}>
        {renderTokenStatusCard()}
      </Grid>
    </Container>
  );

  const renderNetworkBackdrop = () => (
    <Backdrop className={classes.backdrop} open={props.drizzleState.web3.networkId !== networkId}>
      <Grid className={classes.gridStyle}>
        <img src={Refresh} alt="lock" width="20%" />
        <Typography className={classes.typographyBackdrop}>Please connect to {networkName} network and Refresh</Typography>
      </Grid>
    </Backdrop>
  );

  const renderLoadingBackdrop = () => (
    <Backdrop className={classes.backdrop} open={loading}>
      <Grid className={classes.gridStyle}>
        <img src={Loader} alt="lock" width="20%" />
        <Typography
          className={classes.typographyBackdropLoading}
        >{loadingText}</Typography>
      </Grid>
    </Backdrop>
  );

  const classes = useStyles();
  return (
    <>
      {props?.drizzleState?.web3?.networkId && renderNetworkBackdrop()}
      {loading && renderLoadingBackdrop()}
      <AppHeader
        address={props.drizzle.web3.eth.accounts.givenProvider.selectedAddress}
        network={props.drizzleState.web3.networkId}
      />
      <div className={classes.divImage} style={{ height: isMinHeight && '100%' }}>
        {renderBody()}
      </div>
    </>
  );
}

export default App;
