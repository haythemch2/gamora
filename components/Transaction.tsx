import React from "react";
import Image from "next/image";
import { Token } from "../types";
import { transactionThresholds } from "../config";

type Props = {
  token: Token;
  from: String;
  to: String;
  amount: number;
  Hash: String;
  timestamp: string | null;
};

const Transaction = ({ from, to, amount, Hash, token, timestamp }: Props) => {

  const backgroundColor = transactionThresholds.find((threshold) => amount >= threshold.threshold)!.color;
  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className="w-64 h-[13rem] bg-white shadow rounded-lg p-4 relative" style={cardStyle}>
      <div className="w-full flex items-center justify-between mb-2">
        <p className="absolute bottom-0 right-0 pr-2 text-xs text-gray-400">{timestamp}</p>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Image
            src="/static/transaction.png"
            alt={token.symbol}
            width={38}
            height={38}
            className="mr-1"
          />
         <p className="px-2">
         {`${token.symbol} `}
         </p>
          <a
          href={`https://etherscan.io/tx/${Hash}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-sm text-nowrap"
        >
          / Etherscan /
        </a>
        </h3>
      </div>
      <div className="border-t border-gray-200 my-2 py-2">
        <div className="text-sm text-gray-500">
          <p>
            <span className="font-medium text-gray-700">From:</span>{" "}
            <a
              href={`https://debank.com/profile/${from}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {`${from.slice(0, 25)}...`}
            </a>
          </p>
          <p>
            <span className="font-medium text-gray-700">To:</span>{" "}
            <a
              href={`https://debank.com/profile/${to}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {`${to.slice(0, 25)}...`}
            </a>
          </p>
          <p className="w-full text-center text-red-700 font-bold text-xl pt-2">
            {amount.toFixed(2)} <span>{ token.symbol}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
