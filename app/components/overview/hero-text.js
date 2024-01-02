import Image from "next/image";
import Link from "next/link";

export default function HeroText({ ...props }) {
  return (
    <div className="hero-text text-white">
        <div className="hero-main">
          Create your <br />
          Digital Legacy
        </div>
        <Link href="/vault">
          <Image 
            src="/lock-icon.svg"
            alt="lock-icon svg"
            width={148}
            height={148}
            className="w-148 h-148 rounded-full backdrop-filter backdrop-blur-lg transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-500"
          />
        </Link>
        <div className="hero-details text-white">
          Store your most important documents, credentials and special messages to loved ones securely with assets transfer mechanisms
        </div>
    </div>
  )
}
