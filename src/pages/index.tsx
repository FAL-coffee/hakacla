import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import { PrismaClient, Example } from '@prisma/client'
const prisma = new PrismaClient()

type ServerSideProps = {
  example: Example[]
}

const Home: NextPage<ServerSideProps> = ({ example }) => {
  return (
    <>
      <Head>
        <title>Hakacla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1>test</h1>
        <h2>hello</h2>
        <ul>
          {example.map((e) => (
            <li key={e.toString()}>{e.text}</li>
          ))}
        </ul>
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
