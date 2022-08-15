# Forta bot deployement bot

## Description

This bot detects disputes of relays on the receiving chains for the  [Across v2 Protocol](https://across.to/) - a multichain bridge which uses [UMA](https://umaproject.org/) as its source of on-chain data and validation. For more details refer [here](https://discourse.umaproject.org/t/forta-monitors-across-v2-request-for-proposals/1569).


## Supported Chains
- Mainnet
  
## Alerts

- UMA-DISP
  - Fired when a dispute occurs on the receiving chain
  - Severity is always set to "medium" 
  - Type is always set to "suspicious"
  - Metadata :
      - `disputer`: the disputer - address which raised a dispute
      - `requestTime` : timestamp of the request made
  
## Test Data
Txn:
- 0x43828aac2fdcc17445bafc75992a4eb5c856b0babe87b69b08f4e53bb6c0db9c
- 0x2a65c46484b7e7ef3a2d96852dee5db14e580ba074eeaa52718d1eaa572af621