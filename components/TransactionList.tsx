import React from "react";
import Transaction from "./Transaction";
import { TransactionType } from "../types/index"; // Import the TransactionType

type TransactionListProps = {
  transactions: TransactionType[];
  clearTransactions: () => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  clearTransactions,
}) => {
  return (
    <main>
      <button
        className="w-full py-2 px-8 bg-gray-600 font-bold text-center text-white"
        onClick={clearTransactions}
      >
        Clear
      </button>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="flex flex-wrap gap-4 justify-center">
          {transactions.map((transaction, index) => (
            <div key={index}>
              <Transaction {...transaction} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TransactionList;
