import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TokenAmount, Token, Fetcher, ChainId } from "@uniswap/sdk";
import BigNumber from 'bignumber.js';
import { multiplier, contractAddresses, usdtMultiplier, slippage, gasFee } from '../../constants';
import FarmPanel from '../../component/FarmPanel';
import RedeemPanel from '../../component/RedeemPanel';
import useStyles from './index.style';
import { ethers } from 'ethers';

const TransactionPanel = (props) => {
  const [activeHeader, setActiveHeader] = useState('farm');
  const [stakeInput, setStakeInput] = useState('');
  const [errorText, setErrorText] = useState('');
  const classes = useStyles();
  const provider = new ethers.providers.InfuraProvider("mainnet", process.env.REACT_APP_INFURA_PROVIDER)

  const handleHeaderChange = (header) => {
    setActiveHeader(header);
  };

  const setMaxStakeInput = () => {
    setStakeInput(props.usdtBalance);
  };

  const onStakeInputChange = (event) => {
    setErrorText('');
    setStakeInput(event.target.value);
  };

  const stake = async () => {

    if (stakeInput === '') {
      setErrorText('Please enter an amount');
      return;
    }

    if (parseFloat(stakeInput) <= 0) {
      setErrorText('Amount can not be zero please enter valid amount');
      return;
    }

    if (parseFloat(stakeInput) > props.usdtBalance) {
      setErrorText(`Insufficient wallet balance (${props.usdtBalance})`);
      return;
    }

    try {
      props.setLoading(true);
      props.setLoadingText('Approving USDT...');

      const usdtBeforeStaking = await props.drizzle.contracts.MockERC20.methods.balanceOf(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();

      const address = props.drizzle.web3.eth.accounts.givenProvider.selectedAddress;
      const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, address).call();
      const contracts = props.drizzle.contracts;
      let stake = '' + stakeInput;
      const index = stake.indexOf('.');
      if (index >= 0) {
        stake = stake.substr(0, index + 6);
      }
      const amount = window.web3.utils.toBN(new BigNumber(stake).multipliedBy(new BigNumber(10).pow(usdtMultiplier)));
      const usdtToSupply = window.web3.utils.toBN(new BigNumber(stake).div(2).multipliedBy(new BigNumber(10).pow(usdtMultiplier)));
      if (index >= 0) {
        stake = stake.substr(0, index + 4);
      }
      const slippageTolerance = window.web3.utils.toBN(new BigNumber(stake).minus(new BigNumber(stake).multipliedBy(0.01)).multipliedBy(new BigNumber(10).pow(usdtMultiplier - 1)));

      const allowance = await props.drizzle.contracts.MockERC20.methods.allowance(address, contractAddresses.proxy).call();
      const condition0 = new BigNumber(allowance).div(new BigNumber(10 ** usdtMultiplier)).eq(new BigNumber(0));
      if (!condition0) {
        const conditionAmount = new BigNumber(amount.toString()).isGreaterThan(new BigNumber(allowance));
        if (conditionAmount) {
          props.setLoadingText('Insufficient amount already approved. Resetting approval on USDT contract...');
          await contracts.MockERC20.methods.approve(contractAddresses.proxy, 0).send({ from: address, gasFee: gasFee });
          props.setLoadingText('Approving USDT...');
          await contracts.MockERC20.methods.approve(contractAddresses.proxy, amount).send({ from: address, gasFee: gasFee });
        }
      } else {
        await contracts.MockERC20.methods.approve(contractAddresses.proxy, amount).send({ from: address, gasFee: gasFee });
      }

      const originalUserBalance = await contracts.LP.methods.balanceOf(address).call();

      // await contracts.MockERC20.methods.approve(contractAddresses.proxy, amount).send({ from: address, gasFee: gasFee });

      props.setLoadingText('Swapping USDT for MTLX and supplying USDT-MTLX liquidity...');
      const tokenInData = await contracts.HERC20TokenIn.methods.inject([contractAddresses.usdt], [amount]).encodeABI();

      const minMTLXExpected = await contracts.UniswapV2Router.methods.getAmountsOut(
        usdtToSupply,
        [contractAddresses.usdt, contractAddresses.mtlx]
      ).call();
      const bigMTLXExpected = window.web3.utils.toBN(minMTLXExpected[1]);

      const uniswap_swap_data = contracts.HUniswapV2.methods.swapExactTokensForTokens(
        usdtToSupply,
        bigMTLXExpected,
        [contractAddresses.usdt, contractAddresses.mtlx]
      ).encodeABI();

      const uniswap_supply_data = contracts.HUniswapV2.methods.addLiquidity(
        contractAddresses.usdt,
        contractAddresses.mtlx,
        usdtToSupply,
        bigMTLXExpected,
        slippageTolerance,
        slippageTolerance,
      ).encodeABI();

      await contracts.Proxy.methods.batchExec(
        [contractAddresses.HERC20TokensIn, contractAddresses.HUniswapV2, contractAddresses.HUniswapV2],
        [tokenInData, uniswap_swap_data, uniswap_supply_data]
      ).send({ from: address, gasFee: gasFee });

      props.setLoadingText('Almost there! Approving Uni V2 LP tokens to Amplify...');
      const userBalance = await contracts.LP.methods.balanceOf(address).call();
      const userBalanceToStake = window.web3.utils.toBN(userBalance).sub(window.web3.utils.toBN(originalUserBalance));
      // const userBalanceToStake = window.web3.utils.toBN(new BigNumber(userBalance).div(10 ** multiplier).minus(new BigNumber(originalUserBalance).div(10 ** multiplier)).multipliedBy(10 ** multiplier).toNumber());

      await contracts.LP.methods.approve(
        contractAddresses.amplify,
        userBalanceToStake
      ).send({ from: address, gasFee: gasFee });

      let loadingText = 'Depositing Uni V2 LP tokens in Amplify.';
      if (props.mtlxRewards > 0) {
        loadingText += ' This will also claim the MTLX rewards accumulated to your wallet.'
      }
      loadingText += '..';
      props.setLoadingText(loadingText);
      await contracts.Amplify.methods.deposit(0, userBalanceToStake).send({ from: address, gasFee: gasFee });

      setStakeInput('');
      const usdtAfterStaking = await props.drizzle.contracts.MockERC20.methods.balanceOf(props.drizzle.web3.eth.accounts.givenProvider.selectedAddress).call();
      const diff = new BigNumber(usdtBeforeStaking).minus(new BigNumber(usdtAfterStaking)).div(10 ** usdtMultiplier).toString();
      const mtlxRewardInUSDT = new BigNumber(pendingMTLX).div(new BigNumber(10 ** multiplier)).multipliedBy(props.mtlxValue).toNumber();
      props.updateStakedAmount(address, parseFloat(diff), mtlxRewardInUSDT);
      props.updateBalances();
      props.setLoadingText('Loading');
      props.setLoading(false);
    }
    catch (err) {
      console.log(err);
      props.updateBalances();
      props.setLoadingText('Loading');
      props.setLoading(false);
    }
  };

  const claimMTLXRewards = async () => {
    try {
      props.setLoading(true);
      const address = props.drizzle.web3.eth.accounts.givenProvider.selectedAddress;
      const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, address).call();
      await props.drizzle.contracts.Amplify.methods.withdraw(0, 0).send({ from: address, gasFee: gasFee });
      const mtlxReward = new BigNumber(pendingMTLX).div(new BigNumber(10 ** multiplier)).toNumber();
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

  const unstakeUSDT = async () => {
    try {
      props.setLoading(true);
      props.setLoadingText('Withdrawing Uni V2 LP tokens from Amplify...');
      const address = props.drizzle.web3.eth.accounts.givenProvider.selectedAddress;
      const userInfo = await props.drizzle.contracts.Amplify.methods.userInfo(0, address).call();
      const pendingMTLX = await props.drizzle.contracts.Amplify.methods.pendingMTLX(0, address).call();
      await props.drizzle.contracts.Amplify.methods.withdraw(0, window.web3.utils.toBN(userInfo.amount)).send({ from: address, gasFee: gasFee });
      const savedStakedAmount = await props.getStakedAmount(address);
      const mtlxReward = new BigNumber(pendingMTLX).div(new BigNumber(10 ** multiplier)).toNumber();
      props.updateStakedAmount(address, savedStakedAmount * (-1), mtlxReward);

      props.setLoadingText('Approving Uni V2 LP token to redeem ...');
      const lpTokenWithdrawn = await props.drizzle.contracts.LP.methods.balanceOf(address).call();
      await props.drizzle.contracts.LP.methods.approve(contractAddresses.proxy, window.web3.utils.toBN(lpTokenWithdrawn)).send({ from: address, gasFee: gasFee });
      const tokenInData = await props.drizzle.contracts.HERC20TokenIn.methods.inject(
        [contractAddresses.lp],
        [window.web3.utils.toBN(lpTokenWithdrawn)]
      ).encodeABI();

      props.setLoadingText('Redeeming Uni V2 tokens and Swapping MTLX for USDT...');

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

      Fetcher.fetchPairData(usdtToken, mtlxToken, provider).then(async (pair) => {
        const lpTokensTotalSupply = await props.drizzle.contracts.LP.methods.totalSupply().call();
        const kLast = await props.drizzle.contracts.LP.methods.kLast().call();
        const lpToken = new Token(
          ChainId.MAINNET,
          contractAddresses.lp,
          multiplier,
          await props.drizzle.contracts.LP.methods.symbol().call(),
          await props.drizzle.contracts.LP.methods.name().call()
        );
        const usdtValue = pair.getLiquidityValue(
          usdtToken,
          new TokenAmount(lpToken, window.web3.utils.toBN(lpTokensTotalSupply)),
          new TokenAmount(lpToken, window.web3.utils.toBN(lpTokenWithdrawn)),
          true,
          kLast
        );
        const mtlxValue = pair.getLiquidityValue(
          mtlxToken,
          new TokenAmount(lpToken, window.web3.utils.toBN(lpTokensTotalSupply)),
          new TokenAmount(lpToken, window.web3.utils.toBN(lpTokenWithdrawn)),
          true,
          kLast
        );

        const mtlxRedeemed = window.web3.utils.toBN(new BigNumber(mtlxValue.toExact()).multipliedBy(10 ** multiplier)).muln(slippage);
        const minUSDTOut = window.web3.utils.toBN(new BigNumber(usdtValue.toExact()).multipliedBy(10 ** usdtMultiplier)).muln(slippage);

        const uniRedeemTx = await props.drizzle.contracts.HUniswapV2.methods.removeLiquidity(
          contractAddresses.usdt,
          contractAddresses.mtlx,
          window.web3.utils.toBN(lpTokenWithdrawn),
          minUSDTOut,
          mtlxRedeemed
        ).encodeABI();

        const mtlxToUSDTExpected = await props.drizzle.contracts.UniswapV2Router.methods.getAmountsOut(
          mtlxRedeemed,
          [contractAddresses.mtlx, contractAddresses.usdt]
        ).call();

        const minMTLXToUSDT = window.web3.utils.toBN(mtlxToUSDTExpected[1]).muln(slippage);

        const UniSwapMtlx = await props.drizzle.contracts.HUniswapV2.methods.swapExactTokensForTokens(
          mtlxRedeemed,
          minMTLXToUSDT,
          [contractAddresses.mtlx, contractAddresses.usdt]
        ).encodeABI();

        await props.drizzle.contracts.Proxy.methods.batchExec(
          [contractAddresses.HERC20TokensIn, contractAddresses.HUniswapV2, contractAddresses.HUniswapV2],
          [tokenInData, uniRedeemTx, UniSwapMtlx]
        ).send({ from: address, gasFee: gasFee });

        // const savedStakedAmount = await props.getStakedAmount(address);
        // const mtlxRewardInUSDT = new BigNumber(pendingMTLX).div(new BigNumber(10 ** multiplier)).multipliedBy(props.mtlxValue).toNumber();
        // props.updateStakedAmount(address, savedStakedAmount * (-1), mtlxRewardInUSDT);
        props.updateBalances();
        props.setLoadingText('Loading');
        props.setLoading(false);
      }).catch(err => {
        console.log(err);
        props.updateBalances();
        props.setLoadingText('Loading');
        props.setLoading(false);
      });

    }
    catch (err) {
      console.log(err);
      const address = props.drizzle.web3.eth.accounts.givenProvider.selectedAddress;
      const savedStakedAmount = await props.getStakedAmount(address);
      props.updateStakedAmount(address, savedStakedAmount * (-1));
      props.updateBalances();
      props.setLoadingText('Loading');
      props.setLoading(false);
    }
  };

  const renderPanel = (tag, label) => (
    <Typography
      className={`${classes.inlineElement} ${activeHeader === tag ? classes.active : ''}`}
      onClick={() => handleHeaderChange(tag)}
    >{label}</Typography>
  );
  return (
    <Card className={classes.cardHeight}>
      <CardContent>
        <div className={classes.panelFlex}>
          <div className={classes.flexDiv}>
            {renderPanel('farm', 'Farm')}
            {renderPanel('redeem', 'Redeem')}
          </div>
          <Typography className={classes.tagText}>USDT</Typography>
        </div>
        {activeHeader === 'farm'
          ? <FarmPanel
            setMaxStakeInput={setMaxStakeInput}
            stake={stake}
            onStakeInputChange={onStakeInputChange}
            value={stakeInput}
            errorText={errorText}
          />
          : <RedeemPanel
            unstakeUSDT={unstakeUSDT}
            stakedAmount={props.stakedAmount}
            claimMTLXRewards={claimMTLXRewards}
            mtlxRewards={props.mtlxRewards}
            lpTokensStaked={props.lpTokensStaked}
          />}
      </CardContent>
    </Card>
  );
};

export default TransactionPanel;