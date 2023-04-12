import Head from 'next/head'
import NavBar from './NavBar'

const PageLayout = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Aplicación web para controlar el inventario para todo tipo de negocio' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {
        title !== 'Home' && (
          <NavBar />
        )
      }
    </>
  )
}

export default PageLayout
