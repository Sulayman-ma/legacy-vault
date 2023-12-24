'use client'

import clsx from "clsx";
import { useContext } from "react";
import { Web5Context } from "../lib/Web5Context";

export default function Web5Connected() {

  const { isConnected } = useContext(Web5Context)

  return(
    <div className="flex items-center">
      <div className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center mr-2",
        {
          "bg-green-500": isConnected,
          "bg-red-500": !isConnected,
        },
      )}>
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          {/* Solid filled circle */}
          <circle cx="10" cy="10" r="8" />
        </svg>
      </div>
      {
        isConnected ? (
          <span className="text-gray-500 text-sm">Web5 connected</span>
        ) : (
          <span className="text-gray-500 text-sm">Web5 not connected</span>
        )
      }
    </div>
  )
}
