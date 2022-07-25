import React from "react";
import { PaperClipIcon } from "@heroicons/react/solid";
import Image from "next/image";
type Props = {
  name: String;
  from: String;
  to: String;
  amount: Number;
  Hash: String;
};

const Transaction = ({ from, to, amount, Hash, name }: Props) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <Image
            src="/static/usdt.png"
            width="16"
            height="16"
            className="mx-0.5"
          />
          {` ${name} transaction`}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-blue-500">
          <a
            href={`https://etherscan.io/tx/${Hash}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${Hash.slice(0, 25)}...`}{" "}
          </a>
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              From :{" "}
              <a
                href={`https://debank.com/profile/${from}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm"
              >
                {`${from.slice(0, 25)}...`}{" "}
              </a>
            </dt>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              To :
              <a
                href={`https://debank.com/profile/${to}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm"
              >
                {` ${to.slice(0, 25)}...`}{" "}
              </a>
            </dt>
          </div>

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-red-500">
              {`Amount :  ${amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}
            </dt>
          </div>
        </dl>
      </div>
    </div>
  );
};
export default Transaction;
