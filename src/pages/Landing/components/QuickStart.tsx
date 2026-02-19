import { Box, Code, Container, Heading, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuTerminal, LuContainer } from 'react-icons/lu'
import { ClipboardRoot, ClipboardIconButton } from '@/components/ui/clipboard'

function CodeBlock({ code }: { code: string }) {
  return (
    <Box position="relative" mt="4">
      <ClipboardRoot value={code}>
        <Code
          display="block"
          whiteSpace="pre"
          p="5"
          rounded="lg"
          fontSize="sm"
          overflowX="auto"
          bg={{ base: 'gray.100', _dark: 'gray.900' }}
        >
          {code}
        </Code>
        <Box position="absolute" top="2" right="2">
          <ClipboardIconButton aria-label="Copy" />
        </Box>
      </ClipboardRoot>
    </Box>
  )
}

export default function QuickStart() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="quick-start" py={{ base: '16', md: '24' }}>
      <Container maxW="2xl" px={{ base: '4', md: '6' }}>
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb="12">
          {t('quickStart.sectionTitle')}
        </Heading>
        <Tabs.Root defaultValue="go" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="go">
              <LuTerminal />
              {t('quickStart.goTab')}
            </Tabs.Trigger>
            <Tabs.Trigger value="docker">
              <LuContainer />
              {t('quickStart.dockerTab')}
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="go">
            <CodeBlock code={t('quickStart.goCode')} />
          </Tabs.Content>
          <Tabs.Content value="docker">
            <CodeBlock code={t('quickStart.dockerCode')} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  )
}
