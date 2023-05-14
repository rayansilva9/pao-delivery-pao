import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { setCookie } from 'nookies'
import { UserContext } from '@/context/userContext'
import { setDoc, doc } from 'firebase/firestore'
import Link from 'next/link'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { setUser } = useContext(UserContext)

  const { push } = useRouter()

  const createUser = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    //CRIANDO USUÁRIO
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user
        console.log(user)

        //SALVANDO NOS COOKIES
        let i = { username: username, email: user.email, uid: user.uid }
        setCookie(undefined, 'USI', JSON.stringify(i), {
          maxAge: 60 * 60 * 24 * 365 // 1 ano
        })
        setUser(i)

        //SALVANDO NO BANCO DE DADOS
        await setDoc(doc(db, 'users', user.uid), {
          username: username,
          email: user.email,
          uid: user.uid,
          avatar: user.photoURL,
          dateCreated: user.metadata.creationTime
        })

        push('/')
      })
      .then(() => setLoading(false))
  }

  return (
    <>
      {loading ? (
        <p>carregando</p>
      ) : (
        <div className="flex min-h-screen items-center justify-center pb-9 px-4 sm:px-6 lg:px-8">
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
            <form className="mt-8 space-y-6" onSubmit={createUser}>
              <input type="hidden" name="remember" value="true" />
              <div className="flex flex-col items-center w-full gap-5 rounded-md shadow-sm">
                <div className='w-full flex items-center justify-center'>
                  <label htmlFor="username" className="sr-only">
                    Nome de Usuário
                  </label>
                  <input
                    id="username"
                    onChange={({ target }) => {
                      setUsername(target.value)
                    }}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="relative block w-[90%] appearance-none  rounded-full border border-blue-400 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Nome de Usuário"
                  />
                </div>
                <div className='w-full flex items-center justify-center'>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    onChange={({ target }) => {
                      setEmail(target.value)
                    }}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-[90%] appearance-none  rounded-full border border-blue-400 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div className='w-full flex items-center justify-center'>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    onChange={({ target }) => {
                      setPassword(target.value)
                    }}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-[90%] appearance-none  rounded-full border border-blue-400 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">

                <div className="text-sm">
                  já tem conta? <Link href='/signIn'><span className='text-blue-400 font-semibold'>Sign In</span></Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-full border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                  CRIAR
                </button>
              </div>
            </form>
          </div >
        </div >
      )}
    </>
  )
}

export default SignUp
