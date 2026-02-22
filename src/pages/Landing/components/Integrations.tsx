import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const channels = ['Telegram', 'Lark', 'HTTP API']
const providers = ['OpenAI', 'Anthropic', 'Gemini', 'Ollama', 'Qwen']

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <Box
      px="5"
      py="2.5"
      borderRadius="full"
      borderWidth="1px"
      borderColor="border.muted"
      fontSize="sm"
      fontWeight="500"
      transition="all 0.2s"
      cursor="default"
      _hover={{ borderColor: 'green.500/40', bg: { base: 'green.50', _dark: 'green.500/5' } }}
    >
      {children}
    </Box>
  )
}

export default function Integrations() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="integrations" py={{ base: '16', md: '24' }}>
      <Container maxW="3xl" px={{ base: '4', md: '6' }}>
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="700"
          textAlign="center"
          mb={{ base: '10', md: '14' }}
          letterSpacing="-0.02em"
        >
          {t('integrations.sectionTitle')}
        </Heading>
        <VStack gap="10">
          <VStack gap="4">
            <Text fontWeight="600" fontSize="sm" color="fg.muted" letterSpacing="0.04em" textTransform="uppercase">
              {t('integrations.channels')}
            </Text>
            <Flex gap="3" flexWrap="wrap" justify="center">
              {channels.map((name) => (
                <Pill key={name}>{name}</Pill>
              ))}
            </Flex>
          </VStack>
          <VStack gap="4">
            <Text fontWeight="600" fontSize="sm" color="fg.muted" letterSpacing="0.04em" textTransform="uppercase">
              {t('integrations.providers')}
            </Text>
            <Flex gap="3" flexWrap="wrap" justify="center">
              {providers.map((name) => (
                <Pill key={name}>{name}</Pill>
              ))}
            </Flex>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
