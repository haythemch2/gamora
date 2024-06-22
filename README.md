# Gamora

> ERC20 transactions tracker tool

<p align="center">
  <img src="https://i.ibb.co/fvTsMsN/Screenshot-from-2024-06-22-21-34-42.png" width="600" title="hover text">
</p>

### How to use
1. First Adapt to your preferred provider for `provider` preset in `components/Magic.tsx` ( defaults to cloudflare `https://cloudflare-eth.com/` )
2. Update `whiteListTokens` in `/config/index.ts` to your ERC20 symbols of choice ! 
3. Verify `/tokens.json` has the main data for your tokens of choice ( mainly `address`, `symbol` & `decimals` ) !
3. `build & serve` to find whales to track !
