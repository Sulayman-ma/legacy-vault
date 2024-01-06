'use client'

import Header from "@/app/components/header";
import Footer from "../components/footer";

export default function Layout({ children }) {
  return(
      <div>
        <Header />
        <div className="flex-1 p-8 bg-black h-auto scroll-disabled">
          {children}
        </div>
        {/* ADJUST FOOTER FOR LATER */}
        {/* <Footer /> */}
      </div>
  )
}
