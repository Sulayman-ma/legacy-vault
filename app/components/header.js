import Link from "next/link";
import Web5Connected from "./web5-connected";

export default function Header() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <div>
          <Link href="#">
            <span className="font-semibold text-xl cursor-pointer">Legacy Vault</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/vault">
            <span className="hover:underline cursor-pointer">Overview</span>
          </Link>
          <Link href="/vault/create-entry">
            <span className="hover:underline cursor-pointer">Create Entry</span>
          </Link>
          {/* <Link href="/beneficiaries">
            <span className="hover:underline cursor-pointer">Beneficiaries</span>
          </Link> */}
          <Web5Connected />
        </div>
      </div>
    </div>
  )
}
