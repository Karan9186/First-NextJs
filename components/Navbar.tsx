import Link from 'next/link'
import React from 'react'
const Navbar = () => {
  return (
    <>
    <div className='fixed w-[100vw] z-50 top-0 p-5 bg-slate-200 shadow-md shadow-slate-300 flex items-center justify-center gap-7'>
      <Link href={"/"} className='text-2xl font-semibold'>Routes</Link>
      <div>
        <ul className='flex gap-4'>
            <li><Link href={"/home"}>Home</Link></li>
            <li><Link href={"/pages"}>Pages</Link></li>
            <li><Link href={"/docs"}>Docs</Link></li>
            <li><Link href={"/read-me"}>Read me</Link></li>
        </ul>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    </>
  )
}

export default Navbar
