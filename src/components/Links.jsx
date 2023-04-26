import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logoutIcon from '@/assets/logout.svg'

const Links = ({ open }) => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }
  const Pages = [
    {
      text: 'Bebidas',
      url: '/bebidas'
    },
    {
      text: 'Inventario',
      url: '/inventario'
    }
    // {
    //   text: 'Ventas',
    //   url: '/ventas'
    // }
  ]
  return (
    <div
      className={`transition-all relative z-10 ease-out duration-500 md:transition-none ${
        open ? 'h-screen' : 'h-0'
      }  items-center w-full md:flex  md:h-14 md:w-auto md:order-1`}
      id='navbar-sticky'
    >
      <ul
        className={`${
          !open && 'hidden'
        } md:flex duration-300 ease-out sm:transition-none flex flex-col p-4 md:p-0 mt-4 font-medium bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent`}
      >
        {Pages.map(page => (
          <li key={page.text}>
            <Link
              href={page.url}
              className='block cursor-pointer py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 uppercase hover:text-secondary-100 hover:transition-all hover:duration-700'
            >
              {page.text}
            </Link>
          </li>
        ))}
        <li className='pl-3 pr-4'>
          <Image
            onClick={() => {
              handleLogout()
            }}
            className='cursor-pointer'
            src={logoutIcon}
            width={25}
            height={25}
            alt='Logout icon'
          />
        </li>
      </ul>
    </div>
  )
}
export default Links
