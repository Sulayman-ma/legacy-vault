'use client'

import { 
  Breadcrumbs,
  Typography 
} from "@material-tailwind/react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full">
      {/* parent of the 3 main footer items */}
      <div className="bg-black text-gray-400 my-10 flex flex-col md:flex-row lg:justify-evenly md:gap-3 md:justify-between gap-6">
        {/* VAULT LOGO */}
        <div className="ml-3 pl-10 md:pl-0">
          <Image 
            alt="elteej-logo"
            src="/logo.jpg"
            width={250}
            height={250}
          />
        </div>

        {/* CONTACT SECTION */}
        <div className="flex flex-col gap-5 ml-3 pl-10 md:pl-0">
          <p className="relative">
            <Image
              width={30}
              height={30} 
              src="/svg/phonem.svg"
              className="absolute -left-10 top-1"
              alt="phone-icon"
            />
              <strong>Tel</strong> <br />
            <Link href="tel:08012345678">(080) 1234 5678</Link>
          </p>
          <p className="relative">
            <Image
              width={30}
              height={30} 
              src="/svg/phonem.svg"
              className="absolute -left-10 top-1"
              alt="alt-phone-icon"
            />
            <strong>Fax</strong> <br />
            <Link href="tel:08012345678">(080) 1234 5678</Link>
          </p>
          <p className="relative">
            <Image
              width={30}
              height={30} 
              src="/svg/email.svg"
              className="absolute -left-10 top-1"
              alt="email-icon"
            />
            <strong>Email</strong> <br />
            <Link href="mailto:elteej123@gmail.com">
              elteej123@gmail.com
            </Link>
          </p>
        </div>
      </div>

      {/* FOOTER, BREADCRUMBS AND COPYRIGHT TEXT */}
      <div className="flex flex-col justify-center items-center mb-10">
        <Breadcrumbs 
          separator=" | "
          fullWidth={true}
          className="bg-transparent"
        >
          <Link href="/">Home</Link>
          <Link href="/vault/assets">Assets</Link>
          <Link href="/vault/beneficiaries">Benficiaries</Link>
        </Breadcrumbs>
        <Typography
          variant="small"
          className="opacity-90 text-center"
        >
          Copyright © 2024 Digital Legacy Vault. All Rights Reserved. Designed by Fanen Anula and Developed by <a href="mailto:suleyman.abba@gmail.com" className="text-[#012060]">Suleiman Mai-Abba</a>.
        </Typography>
      </div>
    </footer>
  )
}
