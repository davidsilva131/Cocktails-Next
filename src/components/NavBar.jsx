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
      {/* <nav>
          <ul className='w-full flex gap-5 justify-center bg-blue-950  p-5 '>
            {
              Pages.map(page => (
                <li key={page.text}>
                  <Link
                    className='hover:text-green-500 text-white font-bold transition-all duration-500'
                    href={page.url}
                  >
                    {page.text}
                  </Link>
                </li>
              ))
            }
            <li>
              <Image
                onClick={() => { handleLogout() }}
                className='cursor-pointer'
                src={logoutIcon}
                width={25}
                height={25}
                alt='Logout icon'
              />
            </li>
          </ul>
        </nav> */}
    </>
  )
}

export default NavBar
