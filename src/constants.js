export const contractAddresses = {
  mtlx: "0x2e1E15C44Ffe4Df6a0cb7371CD00d5028e571d14",
  amplify: '0xEBF56FB1C3029115555680aF6bfD97B6CF541bAB',
  lp: '0x1a57ec5459928389fBB5612fF2a5e0b534fD9E2E',
  proxy: '0x916EdF608c0e7aAE2E26B283a93fc26f2CD8C715',
  usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  registry: '0xb872B19f6682F1DB65C8351233085bAd5c7b1c13',
  HUniswapV2: '0x5c260c28DfE03c5eb2829BFC66B07EbBF349fe1c',
  HERC20TokensIn: '0x871D6447879d7ccDadC80457731cc1722A8e8aCe',
  UniswapV2Router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
}

export const RewardPoolAddress = "0xebf56fb1c3029115555680af6bfd97b6cf541bab";
export const multiplier = 18
export const usdtMultiplier = 6
export const gasFee = 65000000
export const gasLimit = 7000000
export const networkId = 1
export const networkName = 'Mainnet'
export const slippage = 0.96
export const totalTokens = 1000000;

export const networks = {
  kovan: 42,
}

export const networkNames = {
  42: 'kovan',
  1: 'Mainnet'
}

export const truncateDecimals = (amount, decimalDigit) => {
  if (!amount) amount = 0;
  let amountValue = amount.toString();
  if (amountValue.indexOf(".") > 0) {
    amountValue = amountValue.slice(0, (amountValue.indexOf(".")) + decimalDigit + 1)
  } else {
    amountValue = (amountValue + '.').padEnd(decimalDigit, "0")
  }
  return Number(amountValue).toFixed(decimalDigit)
}