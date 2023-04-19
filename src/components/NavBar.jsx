import Link from 'next/link'
import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Links from './Links'
const NavBar = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <nav className='bg-black w-full '>
        <div className='bg-black w-full flex flex-wrap items-center justify-between py-4 px-4 md:px-40'>
          <Link
            className='flex items-center justify-start cursor-pointer'
            href='/bebidas'
          >
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-white uppercase'>
              Cocktails
            </span>
          </Link>
          <div className='flex md:hidden md:order-2'>
            <HamburgerMenu open={open} setOpen={setOpen} />
          </div>
          <Links open={open} />
        </div>
      </nav>
    </>
  )
}

export default NavBar
