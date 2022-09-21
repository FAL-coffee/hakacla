import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'

import { PrismaClient, Example } from '@prisma/client'
const prisma = new PrismaClient()

type ServerSideProps = {
  example: Example[]
}

const Home: NextPage<ServerSideProps> = ({ example }) => {
  const { data: session } = useSession()
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
            <h2 className="text-xl">db health check</h2>
            <ul>
              {example.map((e) => (
                <li key={e.id}>{e.text}</li>
              ))}
            </ul>
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

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const example = await prisma.example.findMany()
  return { props: { example } }
}

export default Home
