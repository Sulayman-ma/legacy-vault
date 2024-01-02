'use client'

import Header from "../components/header";

export default function Layout({ children }) {
  return(
    <div className="">
      <Header />
      <div className="flex-1 p-8 bg-black h-auto scroll-disabled">
        {children}
      </div>
    </div>
  )
}
