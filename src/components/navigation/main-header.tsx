"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import MapImage from "@/assets/map.jpg";
import IconImage from "@/assets/icon.png";

import { useEffect } from "react";

import UserMenu from "../user-menu";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  {
    name: "Pedidos",
    href: "/pedidos",
    icon: ClipboardDocumentCheckIcon,
    current: false,
  },
  {
    name: "Productos",
    href: "/products",
    icon: WrenchScrewdriverIcon,
    current: false
  },
  // {
  //   name: "Inventario",
  //   href: "/inventario",
  //   icon: ArchiveBoxIcon,
  //   current: false,
  // },
  // {
  //   name: "Ubicacion",
  //   href: "/mapsTest",
  //   icon: MapIcon,
  //   current: false,
  // }
];

export default function MainHeader({ content }: { content: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-500 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        className="h-8 w-auto"
                        src={IconImage}
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={`${
                                    path === item.href
                                      ? "bg-blue-400 text-white"
                                      : `text-indigo-200 hover:text-white hover:bg-blue-500`
                                  }
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  `}
                                >
                                  <item.icon
                                    className={`${
                                      path === item.href
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white"
                                    }
                                      h-6 w-6 shrink-0
                                    `}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <Link
                            onClick={() => setSidebarOpen(false)}
                            href="/"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-blue-500 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                className="h-8 w-auto"
                src={IconImage}
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`${
                            path.startsWith(item.href)
                              ? "bg-selected text-white"
                              : "text-indigo-200 hover:text-white hover:bg-selected"
                          }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          `}
                        >
                          <item.icon
                            className={`${
                              path.startsWith(item.href)
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white"
                            }
                              "h-6 w-6 shrink-0"
                            `}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>


                <li className="mt-auto">
                {/* <a
                    href="/chatbot"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-blue-600 hover:text-white"
                  >
                    <ChatBubbleLeftRightIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Chat Bot
                  </a>
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-blue-600 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Settings
                  </a> */}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Link
                  href="/shopping-bag"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View Bag</span>
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                <UserMenu />
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{content}</div>
          </main>
        </div>
      </div>
    </>
  );
}
