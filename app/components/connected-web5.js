'use client'

import clsx from "clsx";
import { useContext } from "react";
import { Web5Context } from "../lib/contexts";

export function Web5Connected() {

  const { isConnected } = useContext(Web5Context)

  return(
    <div className="flex items-center">
      <div className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center mr-2",
        {
          "bg-green-700": isConnected,
          "bg-blue-500": !isConnected,
        },
      )}>
      </div>
      {
        isConnected ? (
          <span className="text-xs uppercase font-smallcaps transition-opacity duration-500">web5 connected</span>
        ) : (
          <span className="text-xs uppercase font-smallcaps">connecting...</span>
        )
      }
    </div>
  )
}
