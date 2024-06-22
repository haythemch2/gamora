import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ethers, Contract } from "ethers";
import useSound from "use-sound";
import tokenList from "../tokens.json";
import { Token, TransactionType, TokenList } from "../types/index"; // Import the types
import Header from "./Header";
import TransactionList from "./TransactionList";
import { getTransferTimestamp } from "../utils";
import { whiteListTokens } from "../config";
import { useAppSelector } from "../Redux/hooks";
import { selectMute } from "../Redux/mainSlice";

const Magic = () => {
  const [play] = useSound("/static/notif.mp3");
  const muted = useAppSelector(selectMute);

  const [TRANSFER_THRESHOLD, setTRANSFER_THRESHOLD] = useState<number>(100);
  const [toShow, setToShow] = useState<TransactionType[]>([]);
  const [title, setTitle] = useState<string>("Please Select ERC20 Choice");
  const [searching, setSearching] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const tokenListMemo = useMemo<TokenList>(() => tokenList as unknown as TokenList, []);

  const listener = useCallback(async () => {
    if (!selectedToken) return;

    const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com/");
    const contract = new Contract(selectedToken.address, standardERC20ABI, provider);

    setTitle(`Listening for transfers: ${selectedToken.symbol}`);
    setSearching(true);

    const transferHandler = async (from: string, to: string, amount: ethers.BigNumber, event: any) => {
      const transferAmount = amount.toNumber() / Math.pow(10, selectedToken.decimals);
      if (transferAmount >= TRANSFER_THRESHOLD) {
        if (!muted) {
          play();
        }
        const timestamp = await getTransferTimestamp(event, contract, provider);
        setToShow((current) => [
          {
            from,
            to,
            amount: transferAmount,
            Hash: event.transactionHash,
            token: selectedToken,
            timestamp: timestamp,
          },
          ...current,
        ]);
      }
    };

    contract.on("Transfer", transferHandler);

    return () => {
      contract.off("Transfer", transferHandler);
    };
  }, [play, selectedToken, TRANSFER_THRESHOLD]);

  useEffect(() => {
    if (selectedToken) {
      const setupListener = async () => {
        const cleanupListener = await listener();
        return cleanupListener;
      };

      const cleanup = setupListener();

      return () => {
        cleanup.then((cleanupFunc) => {
          cleanupFunc && cleanupFunc();
        });
      };
    }
  }, [listener, selectedToken, TRANSFER_THRESHOLD]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const symbol = e.target.value;
    const token = tokenListMemo[symbol];
    setSelectedToken(token || null);
  };

  return (
    <div>
      <Header
        searching={searching}
        title={title}
        selectedToken={selectedToken}
        TRANSFER_THRESHOLD={TRANSFER_THRESHOLD}
        setTRANSFER_THRESHOLD={setTRANSFER_THRESHOLD}
        handleTokenChange={handleTokenChange}
        whiteListTokens={whiteListTokens}
        tokenList={tokenListMemo}
      />
      <TransactionList transactions={toShow} clearTransactions={() => setToShow([])} />
    </div>
  );
};

export default Magic;

const standardERC20ABI: ethers.ContractInterface = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "from", "type": "address" },
      { "indexed": true, "name": "to", "type": "address" },
      { "indexed": false, "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  }];
