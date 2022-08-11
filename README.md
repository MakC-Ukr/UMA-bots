# Forta bot deployement bot

## Description

This bot detects certain events related to the [Across v2 Protocol](https://across.to/) - a multichain bridge which uses [UMA](https://umaproject.org/) as its source of on-chain data and validation. For more details refer [here](https://discourse.umaproject.org/t/forta-monitors-across-v2-request-for-proposals/1569).

## Supported Chains
- Mainnet
## Alerts

- LIQ-DEPO
  - Fired when a deposit of tokens is made to the HubPool contract on mainnet
  - Severity is always set to "low" 
  - Type is always set to "info"
  - Metadata :
      - `l1Token`: the ERC20 token contract address whose liquidity was added
      - `amount` : amount of the ERC20 token that was added

## Test Data

Txn:
- 0x4dde102b68a725927c40e3ad81358ee1ea793cb67d0490a938ffed206c78a275