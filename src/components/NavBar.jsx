import Link from 'next/link'
import logoutIcon from '@/assets/logout.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
const NavBar = () => {
  const router = useRouter()
  const Pages = [
    {
      text: 'Bebidas',
      url: '/bebidas'
    },
    {
      text: 'Inventario',
      url: '/inventario'
    },
    {
      text: 'Ventas',
      url: '/ventas'
    }
  ]
  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }
  return (
    <>
      <header>
        <nav>
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
        </nav>
      </header>
    </>
  )
}

export default NavBar
