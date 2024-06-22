import { ethers } from "ethers";
import { format } from "date-fns";

export const getTransferTimestamp = async (
  event: any,
  contract: ethers.Contract,
  provider: ethers.providers.JsonRpcProvider
): Promise<string | null> => {
  try {
    const receipt = await provider.getTransactionReceipt(event.transactionHash);

    if (!receipt) {
      console.log("Transaction receipt not found!");
      return null;
    }

    const transferEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((evt: any) => evt && evt.name === "Transfer");

    if (!transferEvent) {
      console.log("Transfer event not found in the transaction logs!");
      return null;
    }

    const block = await provider.getBlock(receipt.blockNumber);
    return format(new Date(block.timestamp * 1000), "PPpp");
  } catch (error) {
    console.error("Error fetching transfer timestamp:", error);
    return null;
  }
};
