/* eslint-disable space-before-function-paren */
import { UserProvider } from '@/context/userContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>

  )
}
