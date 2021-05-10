// _includes/header.js
import Link from "next/link";

export default function Header() {
    return (
        <header className="py-3 fixed top-0 z-50 flex flex-wrap justify-between w-screen bg-white border-b border-gray-200">
            <div className="mx-3 py-2 px-4  font-bold text-indigo-500">
                Gianpaolo Macario's blog
            </div>
            <div className="justify-end">
                
                <Link href="/">
                    <a className="mr-6 py-2 px-4 inline-block rounded h-full text-indigo-500 hover:text-white hover:bg-indigo-500">
                        Home
                    </a>
                </Link>
                <Link href="/posts">
                    <a className="mr-6 py-2 px-4 inline-block rounded h-full text-indigo-500 hover:text-white hover:bg-indigo-500">
                        Posts
                    </a>
                </Link>
            </div>
        </header>
    )
}