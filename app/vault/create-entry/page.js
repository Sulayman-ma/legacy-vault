'use client'

import CreatePass from "@/app/components/create-pass"
import { useContext, useState } from "react"
import { Web5Context } from "@/app/lib/Web5Context"
import CreateVc from "@/app/components/create-vc"

export default function Page() {

  const { web5, myDid } = useContext(Web5Context)
  const [showCompOne, setShowCompOne] = useState(true);

  const handleShowComponent = (compNumber) => {
    if (compNumber === 1) {
      setShowCompOne(true);
    } else {
      setShowCompOne(false);
    }
  };

  return(
    <div className="max-w-md mx-auto mt-8 p-6 bg-black text-white rounded-md">
      <div className="flex justify-center mb-4">
        <button
          className={`mr-4 py-2 px-4 rounded-md ${showCompOne ? 'bg-gray-800 text-white' : 'bg-gray-500 text-gray-300'}`}
          onClick={() => handleShowComponent(1)}
        >
          Create Passphrase
        </button>
        <button
          className={`py-2 px-4 rounded-md ${!showCompOne ? 'bg-gray-800 text-white' : 'bg-gray-500 text-gray-300'}`}
          onClick={() => handleShowComponent(2)}
        >
          Create Credential
        </button>
      </div>
      <div>
        {showCompOne ? 
        <CreatePass web5={web5} /> 
        : 
        <CreateVc 
          web5={web5}
          myDid={myDid}
        />
        }
      </div>
    </div>
  )
}
