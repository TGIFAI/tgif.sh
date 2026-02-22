import { Box, Container, Flex, Heading, HStack, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuTerminal, LuContainer } from 'react-icons/lu'
import { ClipboardRoot, ClipboardIconButton } from '@/components/ui/clipboard'

function TerminalBlock({ code }: { code: string }) {
  return (
    <Box
      mt="5"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'gray.800' }}
    >
      {/* Title bar */}
      <Flex
        px="4"
        py="2.5"
        bg={{ base: 'gray.100', _dark: 'gray.900' }}
        align="center"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'gray.800' }}
      >
        <HStack gap="2">
          <Box w="2.5" h="2.5" borderRadius="full" bg="red.400" />
          <Box w="2.5" h="2.5" borderRadius="full" bg="yellow.400" />
          <Box w="2.5" h="2.5" borderRadius="full" bg="green.400" />
        </HStack>
      </Flex>

      {/* Code area */}
      <Box position="relative">
        <ClipboardRoot value={code}>
          <Box
            px={{ base: '4', md: '6' }}
            py="5"
            bg={{ base: 'gray.950', _dark: 'gray.950' }}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={{ base: 'xs', md: 'sm' }}
            lineHeight="tall"
            overflowX="auto"
          >
            {code.split('\n').map((line, i) => (
              <Text key={i} color="gray.400">
                {line.startsWith('$') || line.startsWith('go') || line.startsWith('friday') || line.startsWith('docker') ? (
                  <>
                    <Text as="span" color="green.400">$ </Text>
                    <Text as="span" color="gray.300">{line.replace(/^\$ ?/, '')}</Text>
                  </>
                ) : (
                  <Text as="span" color="gray.500">{line}</Text>
                )}
              </Text>
            ))}
          </Box>
          <Box position="absolute" top="2" right="2">
            <ClipboardIconButton
              aria-label="Copy"
              size="sm"
              variant="ghost"
              color="gray.500"
              _hover={{ color: 'gray.300', bg: 'gray.800' }}
            />
          </Box>
        </ClipboardRoot>
      </Box>
    </Box>
  )
}

export default function QuickStart() {
  const { t } = useTranslation()

  const goCode = 'go install github.com/tgifai/friday@latest\nfriday gateway run'
  const dockerCode = 'docker run -d \\\n  -v ./config.yaml:/app/config.yaml \\\n  tgifai/friday gateway run'

  return (
    <Box as="section" id="quick-start" py={{ base: '16', md: '24' }}>
      <Container maxW="2xl" px={{ base: '4', md: '6' }}>
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="700"
          textAlign="center"
          mb={{ base: '10', md: '14' }}
          letterSpacing="-0.02em"
        >
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
            <TerminalBlock code={goCode} />
          </Tabs.Content>
          <Tabs.Content value="docker">
            <TerminalBlock code={dockerCode} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  )
}
