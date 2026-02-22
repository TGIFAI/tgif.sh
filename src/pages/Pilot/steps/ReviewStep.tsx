import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Code,
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

      <Code
        display="block"
        whiteSpace="pre"
        p="5"
        rounded="lg"
        fontSize="sm"
        overflowX="auto"
        maxH="600px"
        overflowY="auto"
        bg={{ base: 'gray.100', _dark: 'gray.900' }}
        lineHeight="tall"
      >
        {store.yamlOutput}
      </Code>

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
