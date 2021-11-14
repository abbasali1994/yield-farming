import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TokenAmount, Token, Fetcher, ChainId } from "@uniswap/sdk";
import { ethers } from 'ethers';
import bigNumber from 'bignumber.js';
import useStyles from './index.style';
import { multiplier, contractAddresses, usdtMultiplier, gasFee } from '../../constants';
import CssTextField from '../../component/FarmPanel/CssTextField';

const provider = new ethers.providers.InfuraProvider("mainnet", process.env.REACT_APP_INFURA_PROVIDER);

const LPTokensTransaction = (props) => {
  const classes = useStyles();

  const [amountToStake, setAmountToStake] = useState('');
  const [errorText, setErrorText] = useState('');
  const [activeHeader, setActiveHeader] = useState('stake');

  const handleInputChange = (event) => {
    setErrorText('');
    setAmountToStake(event.target.value);
  };

  const handleMaxInput = () => {
    setErrorText('');
    setAmountToStake(props.lpTokens);
  };

  const stakeLPTokens = async () => {

    const amount = parseFloat(amountToStake);

    if (amountToStake === '') {
      setErrorText('Please enter an amount');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setErrorText('Amount can not be zero please enter valid amount');
      return;
    }

    if (parseFloat(amount) > props.lpTokens) {
      setErrorText(`Insufficient wallet balance (${props.lpTokens})`);
      return;
    }

    try {
      props.setLoading(true);
      props.setLoadingText('Staking..');
      const userBalance = window.web3.utils.toBN(new bigNumber(amount).multipliedBy(10 ** multiplier).toNumber());
      const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, props.address).call();
      await props.drizzle.contracts.LP.methods.approve(
        contractAddresses.amplify,
        userBalance
      ).send({ from: props.address, gasFee: gasFee });
  
      await props.drizzle.contracts.Amplify.methods.deposit(0, userBalance).send({ from: props.address, gasFee: gasFee });
      const amountStaked = new bigNumber(amount).multipliedBy(10 ** multiplier).toNumber();
      await updateStakedAmount(amountStaked, pendingMTLX);
    }
    catch (err) {
      console.log(err);
      props.updateBalances();
      props.setLoadingText('Loading..');
      props.setLoading(false);
    }
  };

  const unStakeLPTokens = async () => {
    try {
      props.setLoading(true);
      props.setLoadingText('Unstaking..');
      const userInfo = await props.drizzle.contracts.Amplify.methods.userInfo(0, props.address).call();
      const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, props.address).call();
      await props.drizzle.contracts.Amplify.methods.withdraw(0, window.web3.utils.toBN(userInfo.amount)).send({ from: props.address, gasFee: gasFee });
      const savedStakedAmount = await props.getStakedAmount(props.address);
      const mtlxRewardInUSDT = new bigNumber(pendingMTLX).div(new bigNumber(10 ** multiplier)).multipliedBy(props.mtlxValue).toNumber();
      props.updateStakedAmount(props.address, savedStakedAmount * (-1), mtlxRewardInUSDT);
      props.updateBalances();
      props.setLoadingText('Loading..');
      props.setLoading(false);
    }
    catch (err) {
      console.log(err);
      props.updateBalances();
      props.setLoadingText('Loading..');
      props.setLoading(false);
    }
  };

  const updateStakedAmount = (amount, pendingMTLX) => {
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
        new TokenAmount(lpToken, amount),
        true,
        kLast
      );
      // const usdtStaked = new bigNumber(usdt.toExact()).multipliedBy(2).toString();
      const mtlxRewardInUSDT = new bigNumber(pendingMTLX).div(new bigNumber(10 ** multiplier)).multipliedBy(props.mtlxValue).toNumber();
      await props.updateStakedAmount(props.address, parseFloat(usdt.toFixed(4)) * 2, mtlxRewardInUSDT);
      props.updateBalances();
      setAmountToStake('');
      props.setLoadingText('Loading..');
      props.setLoading(false);
    })
  };

  const handleHeaderChange = (header) => {
    setActiveHeader(header);
  };

  const renderPanel = (tag, label) => (
    <Typography
      className={`${classes.inlineElement} ${activeHeader === tag ? classes.active : ''}`}
      onClick={() => handleHeaderChange(tag)}
    >{label}</Typography>
  );

  const claimMTLXRewards = async () => {
    try {
      props.setLoading(true);
      const address = props.drizzle.web3.eth.accounts.givenProvider.selectedAddress;
      const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, address).call();
      await props.drizzle.contracts.Amplify.methods.withdraw(0, 0).send({ from: address, gasFee: gasFee });
      const mtlxReward = new bigNumber(pendingMTLX).div(new bigNumber(10 ** multiplier)).toNumber();
      props.updateStakedAmount(address, 0, mtlxReward);
      props.updateBalances();
      props.setLoading(false);
    }
    catch (err) {
      console.log(err);
      props.updateBalances();
      props.setLoading(false);
    }
  };

  const renderStaking = () => (
    <>
      <Typography className={classes.textStyle}>Amount to stake</Typography>
      <CssTextField
        color="primary"
        variant="outlined"
        placeholder="Enter Amount..."
        fullWidth
        type="number"
        value={amountToStake}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <Button
              color="primary"
              variant="outlined"
              className={classes.maxButton}
              onClick={handleMaxInput}
            >Max</Button>
          ),
          className: classes.input,
        }}
      />
      <Typography className={classes.errorText}>{errorText}</Typography>
      <Button
        color="primary"
        variant="contained"
        className={classes.stakeButtonStyle}
        onClick={stakeLPTokens}
      >Stake</Button>
      <Typography className={classes.linkText} >Please use this option to provide liquidity via Uniswap pool tokens once you have added liquidity to
        <a className={classes.link} href="https://info.uniswap.org/pair/0x1a57ec5459928389fbb5612ff2a5e0b534fd9e2e" target="_blank" rel="noopener noreferrer">
          &nbsp;MTLX-USDT
        </a> pool</Typography>
    </>
  );

  const renderUnstaking = () => (
    <>
      <Button
        variant="outlined"
        color="primary"
        className={classes.buttonStyle}
        onClick={claimMTLXRewards}
        disabled={props.mtlxRewards === 0}
      // disabled
      >Claim MTLX Rewards</Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.unstakeButtonStyle}
        onClick={unStakeLPTokens}
        disabled={props.lpTokensStaked === 0}
      // disabled
      >Exit: Claim and Unstake All</Button>
      <Typography className={classes.linkText} >Please use this option to provide liquidity via Uniswap pool tokens once you have added liquidity to
        <a className={classes.link} href="https://info.uniswap.org/pair/0x1a57ec5459928389fbb5612ff2a5e0b534fd9e2e" target="_blank" rel="noopener noreferrer">
        &nbsp;MTLX-USDT
        </a> pool</Typography>
    </>
  );

  return (
    <Card className={classes.cardHeight}>
      <CardContent>
        <div className={classes.panelFlex}>
          <div className={classes.flexDiv}>
            {renderPanel('stake', 'Stake')}
            {renderPanel('unstake', 'Unstake')}
          </div>
          <Typography className={classes.tagText}>Uni-V2</Typography>
        </div>
        <div className={classes.stakeBox}>
          {activeHeader === 'stake' ? renderStaking() : renderUnstaking()}
        </div>
      </CardContent>
    </Card>
  );
};

export default LPTokensTransaction;