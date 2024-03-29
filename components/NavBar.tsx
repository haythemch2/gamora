import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  VolumeOffIcon,
} from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectMute } from "../Redux/mainSlice";
import { toggleMute } from "../Redux/mainSlice";

const navigation = [{ name: "Tracker", href: "#", current: false }];
const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};
type Props = {};

const NavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const muted = useAppSelector(selectMute);

  return (
    <Disclosure as="nav" className="bg-gray-600">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/g.png"
                    alt="Gamora"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/g.png"
                    alt="Gamora"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  {muted ? (
                    <VolumeOffIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={() => dispatch(toggleMute())}
                    />
                  ) : (
                    <BellIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={() => dispatch(toggleMute())}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default NavBar;
