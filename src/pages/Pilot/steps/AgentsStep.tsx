import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Input,
  IconButton,
  Flex,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { LuPlus, LuTrash2, LuBot, LuCpu, LuMessageSquare } from 'react-icons/lu'
import { Field } from '@/components/ui/field'
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select'
import { NumberInputRoot, NumberInputField } from '@/components/ui/number-input'
import { Checkbox } from '@/components/ui/checkbox'
import { usePilotStore } from '../store/context'

const AgentCard = observer(function AgentCard({ index }: { index: number }) {
  const store = usePilotStore()
  const { t } = useTranslation()
  const agent = store.agents[index]
  if (!agent) return null

  const modelOptions = store.providerModelOptions
  const channelOptions = store.channelIdOptions

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
          <Icon color="fg.muted"><LuBot /></Icon>
          <Text fontWeight="semibold" fontSize="sm">
            {agent.name || agent.id || t('pilot.agents.agentLabel')}
          </Text>
          {agent.models.primary && (
            <Badge size="sm" colorPalette="blue" variant="subtle">
              {agent.models.primary}
            </Badge>
          )}
        </Flex>
        <IconButton
          aria-label={t('pilot.actions.remove')}
          size="xs"
          variant="ghost"
          colorPalette="red"
          onClick={() => store.removeAgent(index)}
        >
          <LuTrash2 />
        </IconButton>
      </Flex>

      <Box px={{ base: '4', md: '6' }} py="5">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
          <Field label={t('pilot.agents.id')}>
            <Input
              value={agent.id}
              onChange={(e) => store.updateAgent(index, { id: e.target.value })}
              placeholder="default"
            />
          </Field>
          <Field label={t('pilot.agents.name')}>
            <Input
              value={agent.name}
              onChange={(e) => store.updateAgent(index, { name: e.target.value })}
              placeholder="Default Agent"
            />
          </Field>
          <Field label={t('pilot.agents.workspace')}>
            <Input
              value={agent.workspace}
              onChange={(e) => store.updateAgent(index, { workspace: e.target.value })}
              placeholder="workspace"
            />
          </Field>

          <Field label={t('pilot.agents.primaryModel')}>
            <NativeSelectRoot>
              <NativeSelectField
                value={agent.models.primary}
                onChange={(e) =>
                  store.updateAgent(index, {
                    models: { ...agent.models, primary: e.target.value },
                  })
                }
                items={[
                  { value: '', label: t('pilot.agents.selectModel') },
                  ...modelOptions,
                ]}
              />
            </NativeSelectRoot>
          </Field>

          <Field label={t('pilot.agents.fallbackModels')} helperText={t('pilot.agents.fallbackHint')}>
            <Input
              value={agent.models.fallback.join(', ')}
              onChange={(e) => {
                const values = e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
                store.updateAgent(index, {
                  models: { ...agent.models, fallback: values },
                })
              }}
              placeholder="provider:model, provider:model"
            />
          </Field>
        </SimpleGrid>

        {/* Channels */}
        {channelOptions.length > 0 && (
          <Box mt="5" pt="5" borderTopWidth="1px" borderColor="border.muted">
            <Flex align="center" gap="2" mb="3">
              <Icon color="green.500" fontSize="sm"><LuMessageSquare /></Icon>
              <Text fontWeight="medium" fontSize="sm">{t('pilot.agents.channels')}</Text>
            </Flex>
            <Flex gap="4" wrap="wrap">
              {channelOptions.map((opt) => (
                <Checkbox
                  key={opt.value}
                  checked={agent.channels.includes(opt.value)}
                  onCheckedChange={({ checked }) => {
                    const next = checked
                      ? [...agent.channels, opt.value]
                      : agent.channels.filter((c) => c !== opt.value)
                    store.updateAgent(index, { channels: next })
                  }}
                >
                  {opt.label}
                </Checkbox>
              ))}
            </Flex>
          </Box>
        )}

        {/* Runtime Config */}
        <Box mt="5" pt="5" borderTopWidth="1px" borderColor="border.muted">
          <Flex align="center" gap="2" mb="3">
            <Icon color="green.500" fontSize="sm"><LuCpu /></Icon>
            <Text fontWeight="medium" fontSize="sm">{t('pilot.agents.runtimeConfig')}</Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
            <Field label={t('pilot.agents.maxIterations')}>
              <NumberInputRoot
                min={1}
                value={String(agent.config.max_iterations)}
                onValueChange={({ value }) =>
                  store.updateAgent(index, {
                    config: { ...agent.config, max_iterations: Number(value) || 0 },
                  })
                }
              >
                <NumberInputField />
              </NumberInputRoot>
            </Field>
            <Field label={t('pilot.agents.maxTokens')}>
              <NumberInputRoot
                min={1}
                value={String(agent.config.max_tokens)}
                onValueChange={({ value }) =>
                  store.updateAgent(index, {
                    config: { ...agent.config, max_tokens: Number(value) || 0 },
                  })
                }
              >
                <NumberInputField />
              </NumberInputRoot>
            </Field>
            <Field label={t('pilot.agents.temperature')}>
              <NumberInputRoot
                min={0}
                max={2}
                step={0.1}
                value={String(agent.config.temperature)}
                onValueChange={({ value }) =>
                  store.updateAgent(index, {
                    config: { ...agent.config, temperature: Number(value) || 0 },
                  })
                }
              >
                <NumberInputField />
              </NumberInputRoot>
            </Field>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
})

const AgentsStep = observer(function AgentsStep() {
  const store = usePilotStore()
  const { t } = useTranslation()

  return (
    <VStack align="stretch" gap="6">
      <Box>
        <Heading size="lg" fontWeight="bold">{t('pilot.agents.title')}</Heading>
        <Text color="fg.muted" mt="1" fontSize="sm">{t('pilot.agents.description')}</Text>
      </Box>

      {store.agents.length === 0 && (
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="border.muted"
          borderRadius="xl"
          py="12"
          textAlign="center"
        >
          <Icon fontSize="3xl" color="fg.subtle" mb="2"><LuBot /></Icon>
          <Text color="fg.muted" fontSize="sm">{t('pilot.agents.empty')}</Text>
        </Box>
      )}

      {store.agents.map((_, i) => (
        <AgentCard key={i} index={i} />
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
        onClick={() => store.addAgent()}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="2"
        color="fg.muted"
        fontWeight="medium"
        fontSize="sm"
      >
        <LuPlus />
        {t('pilot.actions.addAgent')}
      </Box>
    </VStack>
  )
})

export default AgentsStep
