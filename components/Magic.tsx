import React, { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import Transaction from "./Transaction";
import { json } from "stream/consumers";
import useSound from "use-sound";
import Image from "next/image";
import { useAppSelector } from "../Redux/hooks";
import { selectMute } from "../Redux/mainSlice";

type Props = {};

const Magic = (props: Props) => {
  const [play] = useSound("/static/notif.mp3");
  const muted = useAppSelector(selectMute);

  const rpcURL = "https://cloudflare-eth.com/";
  const provider = new ethers.providers.JsonRpcProvider(rpcURL);

  const CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDC
  const CONTRACT_ABI = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    { payable: true, stateMutability: "payable", type: "fallback" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "spender", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
  ];

  let contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  type transaction = {
    from: String;
    to: String;
    amount: Number;
    Hash: String;
  };

  // Note: USDC uses 6 decimal places
  const [TRANSFER_THRESHOLD, setTRANSFER_THRESHOLD] =
    useState<Number>(100000000000); //wei
  const [name, setName] = useState<String>("");
  const [toSHow, setToSHow] = useState<transaction[]>([]);
  const [title, setTitle] = useState<String>("Awaiting connection");

  const Listener = async () => {
    console.log("listener called");

    const name = await contract.name();
    setName(name);
    setTitle(
      `Whale tracker Started , Listening for large transfers on ${name}`
    );
    contract.on("Transfer", (from, to, amount, data) => {
      console.log(data);

      // Note: not all ERC-20 tokens index `amount`
      // Using this instead of Ethers.js query filters
      // https://docs.ethers.io/v5/concepts/events/
      if (amount.toNumber() >= TRANSFER_THRESHOLD) {
        if (!muted) {
          play();
        }
        console.log("found whale transfer" + amount / 1000000);
        setToSHow((current) => [
          {
            from,
            to,
            amount: amount / 1000000,
            Hash: data.transactionHash,
          },
          ...current,
        ]);
      }
    });
  };
  useEffect(() => {
    Listener();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {toSHow.map((transaction, key) => (
              <div key={key}>
                <Transaction
                  name={name}
                  from={transaction.from}
                  to={transaction.to}
                  amount={transaction.amount}
                  Hash={transaction.Hash}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Magic;
