import React from "react";
import { NumericFormat } from "react-number-format";
import { Token } from "../types/index"; // Import the Token type

type HeaderProps = {
  searching: boolean;
  title: string;
  selectedToken: Token | null;
  TRANSFER_THRESHOLD: number;
  setTRANSFER_THRESHOLD: (value: number) => void;
  handleTokenChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  whiteListTokens: string[];
  tokenList: { [key: string]: Token };
};

const Header: React.FC<HeaderProps> = ({
  searching,
  title,
  selectedToken,
  TRANSFER_THRESHOLD,
  setTRANSFER_THRESHOLD,
  handleTokenChange,
  whiteListTokens,
  tokenList,
}) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-evenly items-center flex-col sm:flex-row">
        {searching && (
          <span className="animate-ping w-8 h-8 rounded-full bg-gray-600 opacity-75"></span>
        )}
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <NumericFormat
          thousandSeparator={true}
          prefix={selectedToken?.symbol}
          defaultValue={TRANSFER_THRESHOLD}
          onValueChange={(e) => {
            setTRANSFER_THRESHOLD(e.floatValue ?? TRANSFER_THRESHOLD);
          }}
        />
        <select onChange={handleTokenChange}>
          <option value="">Select Token</option>
          {whiteListTokens.map((symbol) =>
            tokenList[symbol] ? (
              <option key={symbol} value={symbol}>
                {tokenList[symbol].name} ({symbol})
              </option>
            ) : null
          )}
        </select>
      </div>
    </header>
  );
};

export default Header;
