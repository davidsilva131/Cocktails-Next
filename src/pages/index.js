/* eslint-disable space-before-function-paren */
import PageLayout from '@/components/PageLayout'
import { login } from '../services/userActions'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import Swal from 'sweetalert2'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/bebidas')
    } else setLoaded(true)
  }, [])

  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()
    const { value: email } = document.getElementById('email')
    const { value: password } = document.getElementById('password')
    try {
      const loged = await login(email, password)
      if (loged) {
        localStorage.setItem('user', loged)
        router.push('/bebidas')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos'
      })
    }
  }
  return (
    <>
      <PageLayout title='Home' />
      {
        loaded
          ? (
            <main className='w-full h-screen justify-center place-items-center flex flex-col gap-7 bg-blue-950'>
              <section>
                <h1 className='text-3xl font-bold text-white'>
                  Iniciar Sesión
                </h1>
              </section>
              <form className='flex flex-col justify-center gap-5'>
                <input className='bg-transparent caret-transparent outline-none caret-white text-white' type='email' placeholder='Correo' id='email' pattern='.+@gmail\.com' title='Porfavor ingrese el correo que se le proporcionó' />
                <input className='bg-transparent caret-transparent outline-none caret-white text-white' type='password' placeholder='Contraseña' minLength={6} id='password' />
                <button className='bg-green-500 rounded p-1' type='' onClick={(e) => { handleLogin(e) }}>Ingresar</button>
                <span className='text-white'>Usa admin@gmail.com y 123456</span>
              </form>
            </main>)
          : (<Loading />)
      }
    </>
  )
}
