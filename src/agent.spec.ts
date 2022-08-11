import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
  ethers,
} from "forta-agent";
import { ADD_LIQUIDITY_EVENT, HUBPOOL_ADDRESS } from "./constants";
import agent from "./agent";

describe("high tether transfer agent", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("returns empty findings if there is no deposit added", async () => {
      mockTxEvent.filterLog = jest.fn().mockReturnValue([]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
        ADD_LIQUIDITY_EVENT,
        HUBPOOL_ADDRESS
      );
    });

    it("returns a finding if there is liquidity added from the relevat address", async () => {
      const mockLiquidityAddedEvent = {
        args: {
          l1Token: "0xdef",
          amount: "0x123",
          lpTokensMinted: "0x420",
          liquidityProvider: "0xdef",
        },
      };
      mockTxEvent.filterLog = jest
        .fn()
        .mockReturnValue([mockLiquidityAddedEvent]);

      const findings = await handleTransaction(mockTxEvent);
      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Across v2 Liquidity Added",
          description: `Liquidity added into the HubPool`,
          alertId: "LIQ-DEPO",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          protocol: "Across v2",
          metadata: {
            l1Token: "0xdef",
            amount: "0x123",
          },
        }),
      ]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
        ADD_LIQUIDITY_EVENT,
        HUBPOOL_ADDRESS
      );
    });
  });
});
