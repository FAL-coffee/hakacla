import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { trpc } from 'src/server/utils/trpc'

import { Example } from '@prisma/client'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const [text, setText] = useState<string>('')

  const fetchExampleAll = trpc.useQuery(['example.getAll'])
  const addExample = trpc.useMutation(['example.addExample'])
  const deleteExampleAll = trpc.useMutation(['example.deleteAll'])

  const [loading, setLoading] = useState<boolean>(false)
  const [example, setExample] = useState<Example[]>([])
  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()

    setLoading(true)
    const data = await addExample.mutateAsync({
      text,
    })
    console.log(data)
    await setExample([...example, data])
    await setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await deleteExampleAll.mutateAsync()
    setLoading(false)
    setExample([])
  }

  const fetch = () => {
    const { data } = fetchExampleAll
    setExample(data!)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <Head>
        <title>Hakacla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <div>
          <h1 className="text-2xl">example</h1>
          <div className="mx-auto mb-5 items-center space-x-4 rounded-xl bg-white p-6 shadow-lg">
            <div>
              <h2 className="text-xl">db getAll example</h2>
              <ul>
                {example.map((e) => (
                  <li key={e.id}>{e.text}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3">
              <h2 className="text-xl">db example post form</h2>
              <button
                className={`flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700 ${
                  loading && 'cursor-not-allowed opacity-50'
                }`}
                type="button"
                onClick={() => fetch()}
              >
                FETCH
              </button>

              <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="flex items-center border-b border-teal-500 py-2">
                  <input
                    className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button
                    className={`flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700 ${
                      loading && 'cursor-not-allowed opacity-50'
                    }`}
                    type="button"
                  >
                    Confirm
                  </button>
                </div>
                <button
                  className={`mt-5 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500 ${
                    loading && 'cursor-not-allowed opacity-50'
                  }`}
                  type="button"
                  onClick={() => handleDelete()}
                >
                  ALL DELETE
                </button>
              </form>
            </div>
          </div>
          <div className="mx-auto items-center space-x-4 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl">auth helth check</h2>
            {session ? (
              <div>
                <div className="my-3">
                  <h3 className="text-lg">logind user info</h3>
                  <p>{session.user.name}</p>
                  <p>{session.user.email}</p>
                </div>
                <button
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                className="mt-5 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
