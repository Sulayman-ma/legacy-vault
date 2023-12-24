'use client'

import Header from "../components/header";
import { useEffect, useState } from "react";
import { Web5Context } from "../lib/Web5Context";
import { configureProtocol } from "../lib/protocols";

export default function Layout({ children }) {
  const [web5, setWeb5] = useState(null)
  const [myDid, setMyDid] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  // connecting to web5 and retaining Web5 object for usage
  useEffect(() => {
    const initWeb5 = async () => {
      const { Web5 } = await import('@web5/api')
      const { web5, did: myDid } = await Web5.connect({
        sync: '10s',
        techPreview: {
          dwnEndpoints: [
            "http://localhost:2222"
          ]
        }
      })

      setWeb5(web5)
      setMyDid(myDid)
      if (web5 && myDid) {
        console.info('Web5 just reconnected')
        setIsConnected(true)
        await configureProtocol(web5)
      } 
    }
    initWeb5()
  }, []);

  return(
    <Web5Context.Provider value={{
      web5: web5,
      myDid: myDid,
      isConnected: isConnected
    }}>
      <>
        <Header />
        <div className="max-w-5xl mx-auto p-8">
          {children}
        </div>
      </>
    </Web5Context.Provider>
  )
}