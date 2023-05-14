import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { UserContext } from '@/context/userContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { AiFillTwitterCircle } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { AiOutlineInstagram } from "react-icons/ai"

import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'

const SignUp: React.FC = () => {
  // const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef<any>()
  const passRef = useRef<any>()

  const { push } = useRouter()

  const { setUser, user } = useContext(UserContext)

  const { USI: token } = parseCookies()

  useEffect(() => {
    if (token) {
      push('/')
    }

  }, [])

  // Login Function
  const logIn = async (e: any) => {
    setLoading(true)
    e.preventDefault()


    emailRef.current!.blur()
    passRef.current!.blur()

    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())
        setCookie(undefined, 'USI', JSON.stringify(docSnap.data()), {
          maxAge: 60 * 60 * 24 * 365 // 1 ano
        })
        setUser(docSnap.data())
        push('/')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        alert(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {user ? null : (
        <>
          {loading && (
            <div className='absolute z-10  w-screen h-screen flex justify-center items-center bg-black opacity-70'>
              <p className='text-white'>CARREGANDO</p>
            </div>
          )}
          <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-16 w-auto"
                  src="https://th.bing.com/th/id/OIP.RJUCT9DiMfwJbXUvGf62vAHaHa?pid=ImgDet&rs=1"
                  alt="Your Company"
                />
                <h2 className="mt-2 text-center text-3xl font-thin tracking-tight text-gray-900">
                  <span className='font-bold'>Pãozin</span> de  cria
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={logIn}>
                <input type="hidden" name="remember" value="true" />
                <div className="flex flex-col gap-5 items-center w-full rounded-md shadow-sm">
                  <div className='w-[90%]'>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      ref={emailRef}
                      onChange={e => setEmail(e.target.value.toLowerCase())}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-full border border-blue-400 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email ou Nome de Usúario"
                    />
                  </div>
                  <div className='w-[90%]'>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      ref={passRef}

                      id="password"
                      name="password"
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-full border border-blue-400 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Senha"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-gray-700">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <div className='flex flex-col items-center w-full'>
                  <button
                    type="submit"
                    className="group relative flex w-[90%] justify-center rounded-full border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    LOGAR
                  </button>
                  <div className='w-full flex flex-col items-center gap-4 mt-7'>
                    <div className='relative w-full flex justify-center items-center gap-1'>
                      <div className='flex-1 bg-gray-300 h-[1px]' ></div>
                      <p className='text-md text-gray-800 relative -top-[2px]'>ou</p>
                      <div className='flex-1 bg-gray-300 h-[1px]' ></div>
                    </div>
                    <div className="flex justify-center gap-8 w-full ">
                      <AiFillTwitterCircle style={{
                        fontSize: '3.4rem', color: '#1d9bf0',
                      }} />
                      <BsFacebook style={{ fontSize: '3rem', color: '#0500a1', }
                      } />
                      <span className='bg-[#E1306C] rounded-full w-[52px] h-[52px] flex justify-center items-center'>
                        <AiOutlineInstagram style={{ fontSize: '2.8rem', color: 'white', }} />
                      </span>
                    </div>
                    <p>
                      Não tem conta? <Link href={'signUp'}><span className='text-blue-400 font-semibold'>Sign Up</span></Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>

      )}

    </>
  )
}

export default SignUp
