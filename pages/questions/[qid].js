import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Heading, Link, Text, Box, Flex, Button } from '@chakra-ui/react'

export default function Home({ data, questionNumber, totalQuestions }) {

  const router = useRouter();
  const [chosen, setChosen] = useState('');
  const [background, setBackground] = useState({a: '', b: '', c: '', d: ''});

  function onOptionClicked(option) {
    if (!chosen) {
      if (option == data.answer) {
        setBackground({...background, ...{[option]: 'green.100'}})
      } else {
        setBackground({...background, ...{[data.answer]: 'green.100', [option]: 'red.100'}})
      }
      setChosen(option);
    }
  }

  function onPrevClicked() {
    const newQuestion = Number(questionNumber) - 1;
    if (newQuestion >= 0) {
      router.push(`/questions/${newQuestion}`);
    }
  }

  function onNextClicked() {
    const newQuestion = Number(questionNumber) + 1;
    if (newQuestion < Number(totalQuestions)) {
      router.push(`/questions/${newQuestion}`);
    }
  }

  return (
    <div>
      <Head>
        <title>Quiz with sheets</title>
        <meta name="description" content="quiz with sheets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" align="center" mt={20}>
        <Heading size="2xl" mb={6} color="black.500">
          Question {Number(questionNumber) + 1}
        </Heading>

        <Text px="10%" textAlign="center">
          {data.question}
        </Text>

        <Flex direction="column" flexWrap="wrap" alignItems="center" justifyContent="center" mt={10} w="100%">
          <Box as="button" p={4} mb={4} borderWidth={1} rounded="lg" w={['80%', '50%']} bg={background['a']} onClick={() => onOptionClicked('a')} cursor="pointer">
            <Heading size="sm" textAlign="center">{data.a}</Heading>
          </Box>
          <Box as="button" p={4} mb={4} borderWidth={1} rounded="lg" w={['80%', '50%']} bg={background['b']}  onClick={() => onOptionClicked('b')} cursor="pointer">
            <Heading size="sm" textAlign="center">{data.b}</Heading>
          </Box>
          <Box as="button" p={4} mb={4} borderWidth={1} rounded="lg" w={['80%', '50%']} bg={background['c']}  onClick={() => onOptionClicked('c')} cursor="pointer">
            <Heading size="sm" textAlign="center">{data.c}</Heading>
          </Box>
          <Box as="button" p={4} mb={4} borderWidth={1} rounded="lg" w={['80%', '50%']} bg={background['d']}  onClick={() => onOptionClicked('d')} cursor="pointer">
            <Heading size="sm" textAlign="center">{data.d}</Heading>
          </Box>
        </Flex>

        <Flex direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" mt={10} w="100%" pl={[10, 40]} pr={[10, 40]}>
          {questionNumber > 0 && <Box as="a" p={4} mb={4} borderWidth={1} rounded="lg" cursor="pointer" onClick={onPrevClicked}>
            <Heading as="h3" size="md" textAlign="center">&larr;</Heading>
          </Box>}
          {questionNumber < totalQuestions - 1 && <Box as="a" p={4} mb={4} borderWidth={1} rounded="lg" cursor="pointer" onClick={onNextClicked}>
            <Heading as="h3" size="md" textAlign="center">&rarr;</Heading>
          </Box>}
        </Flex>
      </Flex>
    </div>
  )
}

export async function getServerSideProps(context) {
  let result;

  const { qid } = context.query;
  const res = await fetch(`https://sheet.best/api/sheets/a5642698-7235-4d79-a6ea-9b10b4e82028`);
  const data = await res.json()
  
  if (qid && data[qid]) {
    result = data[qid];
  }

  return {
    props: {
      data: result,
      questionNumber: qid,
      totalQuestions: data.length,
      key: qid
    }
  }
}