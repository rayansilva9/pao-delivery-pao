import { checkRoutes } from '@/functions/checkRoutes'
import { UserContextProvider } from '../context/userContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { usePathname } from 'next/navigation'
import PrivateRoutes from '@/components/privateRoutes'
import Layout from '@/components/Layout/layout'
import { PriceChekoutProvider } from '@/context/priceCheckoutContext'

export default function App({ Component, pageProps }: AppProps) {

  const pathname = usePathname()

  const isPublicRoute = checkRoutes(pathname!)


  return (
    <UserContextProvider>
      <PriceChekoutProvider>
        <Layout>
          {isPublicRoute && <Component {...pageProps} />}
          {!isPublicRoute && (
            <PrivateRoutes>
              <Component {...pageProps} />
            </PrivateRoutes>
          )}
        </Layout>
      </PriceChekoutProvider>
    </UserContextProvider>
  )
}
