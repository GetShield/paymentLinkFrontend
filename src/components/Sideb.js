"use client";

import { Session } from "next-auth";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

const Sideb = ({ session }) => {
  const pathName = usePathname();
  // useEffect(() => {
  //   // if (session?.isExpired) {
  //   //   router.refresh();
  //   // }

  // }, [session, router]);
  console.log(pathName)
  return <>
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="mt-3 h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img
                src={"/images/icons/Union.png"}
              ></img>
              <span className="ms-3">Dashboard</span>
              {
                (pathName == "/dashboard") &&
                <p className="left"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L7 7L0.999999 1" stroke="#6F767E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </p>
              }
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img
                src={"/images/icons/Vector.png"}
              ></img>
              <span className="ms-3">Transactions</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img
                src={"/images/icons/Store.png"}
              ></img>
              <span className="ms-3">Withdrawals</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img
                src={"/images/icons/light.png"}
              ></img>
              <span className="ms-3">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </>;
};

export default Sideb;
