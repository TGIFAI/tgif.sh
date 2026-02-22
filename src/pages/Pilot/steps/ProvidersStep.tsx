import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Input,
  Badge,
  IconButton,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { LuPlus, LuTrash2, LuBrain } from 'react-icons/lu'
import { Field } from '@/components/ui/field'
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select'
import { NumberInputRoot, NumberInputField } from '@/components/ui/number-input'
import { usePilotStore } from '../store/context'
import { PROVIDER_FIELDS } from '../store/defaults'

const PROVIDER_TYPES = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'ollama', label: 'Ollama' },
  { value: 'qwen', label: 'Qwen' },
]

const TYPE_COLORS: Record<string, string> = {
  openai: 'green',
  anthropic: 'orange',
  gemini: 'blue',
  ollama: 'purple',
  qwen: 'cyan',
}

const ProviderCard = observer(function ProviderCard({ index }: { index: number }) {
  const store = usePilotStore()
  const { t } = useTranslation()
  const provider = store.providers[index]
  if (!provider) return null

  const fields = PROVIDER_FIELDS[provider.type] ?? []

  return (
    <Box
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ borderColor: 'green.500/30' }}
    >
      <Flex
        px={{ base: '4', md: '6' }}
        py="3"
        bg={{ base: 'bg.muted', _dark: 'bg.muted' }}
        align="center"
        justify="space-between"
        borderBottomWidth="1px"
        borderColor="border.muted"
      >
        <Flex align="center" gap="3">
          <Icon color="fg.muted"><LuBrain /></Icon>
          <Text fontWeight="semibold" fontSize="sm">
            {provider.id || t('pilot.providers.providerLabel')}
          </Text>
          <Badge
            size="sm"
            colorPalette={TYPE_COLORS[provider.type] ?? 'gray'}
          >
            {provider.type}
          </Badge>
        </Flex>
        <IconButton
          aria-label={t('pilot.actions.remove')}
          size="xs"
          variant="ghost"
          colorPalette="red"
          onClick={() => store.removeProvider(index)}
        >
          <LuTrash2 />
        </IconButton>
      </Flex>

      <Box px={{ base: '4', md: '6' }} py="5">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
          <Field label={t('pilot.providers.id')}>
            <Input
              value={provider.id}
              onChange={(e) => store.updateProvider(index, { id: e.target.value })}
              placeholder="openai-main"
            />
          </Field>
          <Field label={t('pilot.providers.type')}>
            <NativeSelectRoot>
              <NativeSelectField
                value={provider.type}
                onChange={(e) =>
                  store.updateProvider(index, {
                    type: e.target.value as typeof provider.type,
                  })
                }
                items={PROVIDER_TYPES}
              />
            </NativeSelectRoot>
          </Field>

          {fields.map((field) => (
            <Field
              key={field.key}
              label={field.label}
              required={field.required}
            >
              {field.type === 'number' ? (
                <NumberInputRoot
                  min={0}
                  value={String(provider.config[field.key] ?? field.defaultValue)}
                  onValueChange={({ value }) =>
                    store.updateProviderConfig(index, field.key, Number(value) || 0)
                  }
                >
                  <NumberInputField />
                </NumberInputRoot>
              ) : (
                <Input
                  value={String(provider.config[field.key] ?? '')}
                  onChange={(e) =>
                    store.updateProviderConfig(index, field.key, e.target.value)
                  }
                  placeholder={field.placeholder}
                />
              )}
            </Field>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
})

const ProvidersStep = observer(function ProvidersStep() {
  const store = usePilotStore()
  const { t } = useTranslation()

  return (
    <VStack align="stretch" gap="6">
      <Box>
        <Heading size="lg" fontWeight="bold">{t('pilot.providers.title')}</Heading>
        <Text color="fg.muted" mt="1" fontSize="sm">{t('pilot.providers.description')}</Text>
      </Box>

      {store.providers.length === 0 && (
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="border.muted"
          borderRadius="xl"
          py="12"
          textAlign="center"
        >
          <Icon fontSize="3xl" color="fg.subtle" mb="2"><LuBrain /></Icon>
          <Text color="fg.muted" fontSize="sm">{t('pilot.providers.empty')}</Text>
        </Box>
      )}

      {store.providers.map((_, i) => (
        <ProviderCard key={i} index={i} />
      ))}

      <Box
        as="button"
        borderWidth="2px"
        borderStyle="dashed"
        borderColor="border.muted"
        borderRadius="xl"
        py="4"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: 'green.500/40', bg: { base: 'green.50/50', _dark: 'green.500/5' } }}
        onClick={() => store.addProvider()}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="2"
        color="fg.muted"
        fontWeight="medium"
        fontSize="sm"
      >
        <LuPlus />
        {t('pilot.actions.addProvider')}
      </Box>
    </VStack>
  )
})

export default ProvidersStep
