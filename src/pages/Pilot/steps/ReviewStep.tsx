import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react'
import { LuDownload, LuCopy } from 'react-icons/lu'
import { ClipboardRoot, ClipboardButton } from '@/components/ui/clipboard'
import { usePilotStore } from '../store/context'

const ReviewStep = observer(function ReviewStep() {
  const store = usePilotStore()
  const { t } = useTranslation()

  const handleDownload = useCallback(() => {
    const blob = new Blob([store.yamlOutput], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'config.yaml'
    a.click()
    URL.revokeObjectURL(url)
  }, [store.yamlOutput])

  return (
    <VStack align="stretch" gap="6">
      <Box>
        <Heading size="lg" fontWeight="bold">{t('pilot.review.title')}</Heading>
        <Text color="fg.muted" mt="1" fontSize="sm">{t('pilot.review.description')}</Text>
      </Box>

      {/* Terminal-style YAML preview */}
      <Box
        borderRadius="xl"
        overflow="hidden"
        borderWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'gray.800' }}
      >
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
          <Text
            flex="1"
            textAlign="center"
            fontSize="xs"
            fontFamily="'JetBrains Mono', monospace"
            color={{ base: 'gray.500', _dark: 'gray.600' }}
          >
            config.yaml
          </Text>
          <Box w="12" />
        </Flex>
        <Box
          px={{ base: '4', md: '6' }}
          py="5"
          bg={{ base: 'gray.950', _dark: 'gray.950' }}
          fontFamily="'JetBrains Mono', monospace"
          fontSize={{ base: 'xs', md: 'sm' }}
          lineHeight="tall"
          overflowX="auto"
          maxH="600px"
          overflowY="auto"
          whiteSpace="pre"
          color="gray.400"
        >
          {store.yamlOutput}
        </Box>
      </Box>

      <HStack gap="3">
        <ClipboardRoot value={store.yamlOutput}>
          <ClipboardButton>
            <LuCopy />
            {t('pilot.actions.copy')}
          </ClipboardButton>
        </ClipboardRoot>
        <Button variant="outline" onClick={handleDownload}>
          <LuDownload />
          {t('pilot.actions.download')}
        </Button>
      </HStack>
    </VStack>
  )
})

export default ReviewStep
