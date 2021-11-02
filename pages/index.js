import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Heading, Link, Text, Code, Flex, Box } from '@chakra-ui/react'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Quiz with sheets</title>
        <meta name="description" content="quiz with sheets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading size="2xl" mb={6}>
          Quiz <Link href="/questions/1" color="green.500">App</Link>
        </Heading>

        <Text px="10%" textAlign="center" mt={10}>
          Hey There! Welcome to this quiz app created using Next.js, Chakra UI and sheet.best
        </Text>
        <Text px="10%" textAlign="center" mt={2} color="gray.500">
          Click on the button below to try it out!
        </Text>

        <Box as="a" href="/questions/0"  p={4} m={4} borderWidth={1} rounded="lg" mt={10} bg="green.300">
          <Heading as="h3" size="md" >Try it out &rarr;</Heading>
        </Box>
      </main>
    </div>
  )
}