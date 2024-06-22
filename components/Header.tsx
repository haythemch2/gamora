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
    <header className="bg-white shadow w-full flex">
         <div className="w-1/2 flex justify-center items-center">
         {searching && (
          <span className="animate-ping w-8 h-8 rounded-full bg-gray-600 opacity-75"></span>
        )}
        <h1 className="text-3xl font-bold text-gray-900 ml-4">{title}</h1>
        </div>
        <div className="flex w-1/2 p-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Transaction Minimum !
      </label>
      <NumericFormat
          thousandSeparator={true}
          prefix={selectedToken?.symbol}
          defaultValue={TRANSFER_THRESHOLD}
          onValueChange={(e) => {
            setTRANSFER_THRESHOLD(e.floatValue ?? TRANSFER_THRESHOLD);
          }}
        />
    </div>
    <div className="w-full md:w-1/2 px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    Select Token
      </label>
      <div className="relative">
        <select onChange={handleTokenChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        <option value="">Select Token</option>
        {whiteListTokens.map((symbol) =>
            tokenList[symbol] ? (
              <option key={symbol} value={symbol}>
                {tokenList[symbol].name} ({symbol})
              </option>
            ) : null
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
        </div>
    </header>
  );
};

export default Header;
