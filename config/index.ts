export const whiteListTokens = [
  "USDT",
  "USDC",
  "DAI",
  "BUSD",
  "UNI",
  "LINK",
  "WBTC",
  "AAVE",
  "SHIB",
  "MKR",
  "SUSHI",
  "COMP",
  "YFI",
  "SNX",
  "MANA",
  "CRV",
  "BAT",
  "ENJ",
  "FTT",
  "GRT",
];


export const transactionThresholds = [
  { threshold: 10000000, color: '#ffdede' }, // Soft red for extremely high value
  { threshold: 500000, color: '#ffeded' }, // Light red for very high value
  { threshold: 2000, color: '#ffe4e1' }, // Soft pink for high value
  { threshold: 1000, color: '#fdfd96' }, // Soft yellow for medium-high value
  { threshold: 500, color: '#d4f5d4' }, // Light green for medium value
  { threshold: 100, color: '#e0e0e0' }, // Light gray for low value
  { threshold: 0, color: '#f5f5f5' }, // Default light gray for regular transactions
];