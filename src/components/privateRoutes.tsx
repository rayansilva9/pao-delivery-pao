import { checkRoutes } from '@/functions/checkRoutes'
import { usePathname, useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import React, { ReactNode, useEffect } from 'react'

type props = {
  children: ReactNode
}
const PrivateRoutes: React.FC<props> = ({ children }) => {
  const { USI: token } = parseCookies()

  const { push } = useRouter()
  const pathname = usePathname()

  const isPublicRoute = checkRoutes(pathname!)

  useEffect(() => {
    if (!token) {
      push('signIn')
    }
  }, [])

  return (
    <>
      {!token && null}
      {token && children}
    </>
  )
}

export default PrivateRoutes
