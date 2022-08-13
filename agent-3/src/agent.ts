import {
  BlockEvent,
  Finding,
  HandleBlock,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";
import { DISPUTE_EVENT, HUBPOOL_ADDRESS } from "./constants";

export function provideHandleTransaction(
  disputeEvent: string,
  hubPoolAddress: string
): HandleTransaction {
  const findings: Finding[] = [];
  return async (txEvent: TransactionEvent) => {
    const disputeEventTxns = txEvent.filterLog(disputeEvent, hubPoolAddress);

    disputeEventTxns.forEach((disputeActualEvent) => {
      const { disputer, requestTime } = disputeActualEvent.args;

      findings.push(
        Finding.fromObject({
          name: "Across v2 Dispute",
          description: `The current proposed root bundle was disputed on Hubpool`,
          alertId: "UMA-DISP",
          severity: FindingSeverity.Medium,
          type: FindingType.Suspicious,
          protocol: "Across v2",
          metadata: {
            disputer: disputer.toString(),
            requestTime: requestTime.toString(),
          },
        })
      );
    });
    return findings;
  };
}

export default {
  handleTransaction: provideHandleTransaction(DISPUTE_EVENT, HUBPOOL_ADDRESS),
  // handleBlock
};
