import { Box, Button, Container, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuArrowRight, LuGithub } from 'react-icons/lu'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const terminalLines = [
  { prefix: '$', text: 'friday gateway run', isCommand: true },
  { prefix: 'INF', text: 'Gateway listening on :8088' },
  { prefix: 'INF', text: 'OpenAI provider ready' },
  { prefix: 'INF', text: 'Telegram channel connected' },
  { prefix: 'INF', text: 'Agent [default] initialized' },
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <Box as="section" pt={{ base: '32', md: '44' }} pb={{ base: '16', md: '24' }}>
      <Container maxW="4xl" px={{ base: '4', md: '6' }} textAlign="center">
        <Heading
          as="h1"
          fontFamily="'Instrument Serif', serif"
          fontStyle="italic"
          fontSize={{ base: '5xl', md: '8xl' }}
          fontWeight="normal"
          lineHeight="1.05"
          letterSpacing="-0.03em"
          style={{ animation: 'fadeInUp 0.7s ease-out both' }}
        >
          {t('hero.title')}
        </Heading>

        <Text
          mt="5"
          fontSize={{ base: 'lg', md: 'xl' }}
          fontWeight="500"
          color="fg.muted"
          style={{ animation: 'fadeInUp 0.7s ease-out both', animationDelay: '0.1s' }}
        >
          {t('hero.subtitle')}
        </Text>

        <Text
          mt="4"
          fontSize={{ base: 'sm', md: 'md' }}
          color="fg.muted"
          maxW="xl"
          mx="auto"
          lineHeight="relaxed"
          style={{ animation: 'fadeInUp 0.7s ease-out both', animationDelay: '0.2s' }}
        >
          {t('hero.description')}
        </Text>

        <HStack
          mt="8"
          justify="center"
          gap="3"
          flexWrap="wrap"
          style={{ animation: 'fadeInUp 0.7s ease-out both', animationDelay: '0.3s' }}
        >
          <Button colorPalette="green" size="lg" onClick={() => scrollTo('quick-start')}>
            {t('hero.getStarted')}
            <LuArrowRight />
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/tgifai/friday" target="_blank" rel="noopener noreferrer">
              <LuGithub />
              {t('hero.viewOnGithub')}
            </a>
          </Button>
        </HStack>

        {/* Terminal mockup */}
        <Box
          mt={{ base: '12', md: '16' }}
          mx="auto"
          maxW="2xl"
          textAlign="left"
          borderRadius="xl"
          overflow="hidden"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'gray.800' }}
          shadow={{ base: 'xl', _dark: 'none' }}
          style={{ animation: 'fadeInUp 0.7s ease-out both', animationDelay: '0.5s' }}
        >
          {/* Title bar */}
          <Flex
            px="4"
            py="3"
            bg={{ base: 'gray.100', _dark: 'gray.900' }}
            align="center"
            borderBottomWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'gray.800' }}
          >
            <HStack gap="2">
              <Box w="3" h="3" borderRadius="full" bg="red.400" />
              <Box w="3" h="3" borderRadius="full" bg="yellow.400" />
              <Box w="3" h="3" borderRadius="full" bg="green.400" />
            </HStack>
            <Text
              flex="1"
              textAlign="center"
              fontSize="xs"
              fontFamily="'JetBrains Mono', monospace"
              color={{ base: 'gray.500', _dark: 'gray.600' }}
            >
              friday
            </Text>
            <Box w="12" /> {/* Balance the dots on the left */}
          </Flex>

          {/* Terminal body */}
          <Box
            px={{ base: '4', md: '6' }}
            py="5"
            bg={{ base: 'gray.950', _dark: 'gray.950' }}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={{ base: 'xs', md: 'sm' }}
            lineHeight="tall"
          >
            {terminalLines.map((line, i) => (
              <Flex
                key={i}
                gap="3"
                mt={i === 0 ? '0' : line.isCommand ? '3' : '1'}
                style={{ animation: 'fadeIn 0.4s ease-out both', animationDelay: `${0.8 + i * 0.15}s` }}
              >
                <Text
                  color={line.isCommand ? 'green.400' : 'gray.600'}
                  flexShrink={0}
                  minW={line.isCommand ? '3' : '7'}
                >
                  {line.prefix}
                </Text>
                <Text color={line.isCommand ? 'gray.300' : 'gray.500'} flex="1">
                  {line.text}
                </Text>
                {!line.isCommand && (
                  <Text color="green.400" flexShrink={0}>&#10003;</Text>
                )}
              </Flex>
            ))}
            <Box mt="3" style={{ animation: 'fadeIn 0.3s ease-out both', animationDelay: '1.7s' }}>
              <Box
                as="span"
                display="inline-block"
                w="2"
                h="5"
                bg="green.400"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
