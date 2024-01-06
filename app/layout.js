'use client'

import { Poppins } from 'next/font/google';
import './globals.css'
import { useEffect, useState } from "react";
import { Web5Context } from "./lib/contexts";
import { configureProtocol } from "./lib/protocols";

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: '400',
  preload: true,
})

export default function RootLayout({ children }) {
  const [web5, setWeb5] = useState(null)
  const [myDid, setMyDid] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  // connecting to web5 and retaining Web5 object for usage
  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const { Web5 } = await import('@web5/api')
        const { web5, did: myDid } = await Web5.connect({
          sync: '5s',
          // techPreview: {
          //   dwnEndpoints: [
          //     "http://localhost:2222"
          //   ]
          // }
        })
  
        setWeb5(web5)
        setMyDid(myDid)
        if (web5 && myDid) {
          console.info('Web5 just reconnected')
          setIsConnected(true)
          await configureProtocol(web5, myDid)
        } 
      } catch (error) {
        console.error('Web5 failed to connect', error)
      }
    }
    initWeb5()
  }, []);

  return (
    <html lang="en">
      <body className={`${poppins.className} overflow-auto`}>
        {
          web5 && myDid ? 
          <Web5Context.Provider value={{
            web5: web5,
            myDid: myDid,
            isConnected: isConnected
          }}>
            {children}
          </Web5Context.Provider>
          : ''
        }
        
      </body>
    </html>
  )
}
