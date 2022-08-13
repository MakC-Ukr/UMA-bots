import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
  ethers,
} from "forta-agent";
import { DISPUTE_EVENT, HUBPOOL_ADDRESS } from "./constants";
import agent from "./agent";

describe("Root Bundle Disputed agent", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  it("returns empty findings if there is no dispute", async () => {
    mockTxEvent.filterLog = jest.fn().mockReturnValue([]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([]);
    expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
      DISPUTE_EVENT,
      HUBPOOL_ADDRESS
    );
  });

  it("returns a finding if there a dispute is made on a relevant contract address", async () => {
    const mockDisputeEvent = {
      args: {
        disputer: "0xdef",
        requestTime: "0x123",
      },
    };
    mockTxEvent.filterLog = jest.fn().mockReturnValue([mockDisputeEvent]);

    const findings = await handleTransaction(mockTxEvent);
    expect(findings).toStrictEqual([
      Finding.fromObject({
        name: "Across v2 Dispute",
        description: `The current proposed root bundle was disputed on Hubpool`,
        alertId: "UMA-DISP",
        severity: FindingSeverity.Medium,
        type: FindingType.Suspicious,
        protocol: "Across v2",
        metadata: {
          disputer: "0xdef",
          requestTime: "0x123",
        },
      }),
    ]);
    expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
      DISPUTE_EVENT,
      HUBPOOL_ADDRESS
    );
  });
});
