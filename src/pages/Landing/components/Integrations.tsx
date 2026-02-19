import { Badge, Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const channels = ['Telegram', 'Lark', 'HTTP API']
const providers = ['OpenAI', 'Anthropic', 'Gemini', 'Ollama', 'Qwen']

export default function Integrations() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="integrations" py={{ base: '16', md: '24' }}>
      <Container maxW="3xl" px={{ base: '4', md: '6' }}>
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb="12">
          {t('integrations.sectionTitle')}
        </Heading>
        <VStack gap="10">
          <VStack gap="4">
            <Text fontWeight="semibold" fontSize="sm" color="fg.muted">{t('integrations.channels')}</Text>
            <HStack gap="3" flexWrap="wrap" justify="center">
              {channels.map((name) => (
                <Badge key={name} size="lg" variant="outline" px="4" py="2" fontSize="sm">
                  {name}
                </Badge>
              ))}
            </HStack>
          </VStack>
          <VStack gap="4">
            <Text fontWeight="semibold" fontSize="sm" color="fg.muted">{t('integrations.providers')}</Text>
            <HStack gap="3" flexWrap="wrap" justify="center">
              {providers.map((name) => (
                <Badge key={name} size="lg" variant="outline" px="4" py="2" fontSize="sm">
                  {name}
                </Badge>
              ))}
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
