import {
  BlockEvent,
  Finding,
  HandleBlock,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";
import { ADD_LIQUIDITY_EVENT, HUBPOOL_ADDRESS } from "./constants";



export function provideHandleTransaction(
  liquidityAddedEvent : string,
  hubPoolAddress : string
): HandleTransaction {
  const findings: Finding[] = [];

  return async (txEvent: TransactionEvent) => {
    const liquidityAddedTxns = txEvent.filterLog(
      liquidityAddedEvent,
      hubPoolAddress 
    );

    liquidityAddedTxns.forEach((liquidityAddedEvent) => {
      const {l1Token, amount } = liquidityAddedEvent.args;
      findings.push(
        Finding.fromObject({
          name: "Across v2 Liquidity Added",
          description: `Liquidity added into the HubPool`,
          alertId: "LIQ-DEPO",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          protocol: "Across v2",
          metadata: {
            l1Token: l1Token.toString(),
            amount : amount.toString()
          },
        })
      );
  
    });
  return findings;
}
}


export default {
  handleTransaction: provideHandleTransaction(
    ADD_LIQUIDITY_EVENT,
    HUBPOOL_ADDRESS
  ),
  // handleBlock
};
