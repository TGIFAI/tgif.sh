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
  Accordion,
  Icon,
} from '@chakra-ui/react'
import { LuPlus, LuTrash2, LuMessageSquare, LuShield } from 'react-icons/lu'
import { Field } from '@/components/ui/field'
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select'
import { NumberInputRoot, NumberInputField } from '@/components/ui/number-input'
import { Switch } from '@/components/ui/switch'
import { AccordionItem, AccordionItemTrigger, AccordionItemContent } from '@/components/ui/accordion'
import { usePilotStore } from '../store/context'
import { CHANNEL_FIELDS } from '../store/defaults'
import type { ChannelSecurityConfig } from '../store/types'

const CHANNEL_TYPES = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'lark', label: 'Lark' },
  { value: 'http', label: 'HTTP' },
]

const TYPE_COLORS: Record<string, string> = {
  telegram: 'blue',
  lark: 'purple',
  http: 'green',
}

const ChannelCard = observer(function ChannelCard({ index }: { index: number }) {
  const store = usePilotStore()
  const { t } = useTranslation()
  const channel = store.channels[index]
  if (!channel) return null

  const fields = CHANNEL_FIELDS[channel.type] ?? []

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
          <Icon color="fg.muted"><LuMessageSquare /></Icon>
          <Text fontWeight="semibold" fontSize="sm">
            {channel.id || t('pilot.channels.channelLabel')}
          </Text>
          <Badge
            size="sm"
            colorPalette={TYPE_COLORS[channel.type] ?? 'gray'}
          >
            {channel.type}
          </Badge>
          {!channel.enabled && (
            <Badge size="sm" colorPalette="red" variant="subtle">
              {t('pilot.channels.disabled')}
            </Badge>
          )}
        </Flex>
        <IconButton
          aria-label={t('pilot.actions.remove')}
          size="xs"
          variant="ghost"
          colorPalette="red"
          onClick={() => store.removeChannel(index)}
        >
          <LuTrash2 />
        </IconButton>
      </Flex>

      <Box px={{ base: '4', md: '6' }} py="5">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
          <Field label={t('pilot.channels.id')}>
            <Input
              value={channel.id}
              onChange={(e) => store.updateChannel(index, { id: e.target.value })}
              placeholder="telegram-main"
            />
          </Field>
          <Field label={t('pilot.channels.type')}>
            <NativeSelectRoot>
              <NativeSelectField
                value={channel.type}
                onChange={(e) =>
                  store.updateChannel(index, {
                    type: e.target.value as typeof channel.type,
                  })
                }
                items={CHANNEL_TYPES}
              />
            </NativeSelectRoot>
          </Field>

          {fields.map((field) =>
            field.type === 'select' ? (
              <Field key={field.key} label={field.label} required={field.required}>
                <NativeSelectRoot>
                  <NativeSelectField
                    value={String(channel.config[field.key] ?? field.defaultValue)}
                    onChange={(e) =>
                      store.updateChannelConfig(index, field.key, e.target.value)
                    }
                    items={field.options ?? []}
                  />
                </NativeSelectRoot>
              </Field>
            ) : field.type === 'number' ? (
              <Field key={field.key} label={field.label} required={field.required}>
                <NumberInputRoot
                  min={0}
                  value={String(channel.config[field.key] ?? field.defaultValue)}
                  onValueChange={({ value }) =>
                    store.updateChannelConfig(index, field.key, Number(value) || 0)
                  }
                >
                  <NumberInputField />
                </NumberInputRoot>
              </Field>
            ) : (
              <Field key={field.key} label={field.label} required={field.required}>
                <Input
                  value={String(channel.config[field.key] ?? '')}
                  onChange={(e) =>
                    store.updateChannelConfig(index, field.key, e.target.value)
                  }
                  placeholder={field.placeholder}
                />
              </Field>
            )
          )}

          <Box gridColumn={{ md: 'span 2' }}>
            <Switch
              checked={channel.enabled}
              onCheckedChange={({ checked }) =>
                store.updateChannel(index, { enabled: !!checked })
              }
            >
              {t('pilot.channels.enabled')}
            </Switch>
          </Box>
        </SimpleGrid>

        <Box mt="5" borderTopWidth="1px" borderColor="border.muted" pt="4">
          <Accordion.Root collapsible>
            <AccordionItem value="security">
              <AccordionItemTrigger>
                <Flex align="center" gap="2">
                  <Icon color="fg.muted" fontSize="sm"><LuShield /></Icon>
                  <Text fontWeight="medium" fontSize="sm">{t('pilot.channels.security')}</Text>
                </Flex>
              </AccordionItemTrigger>
              <AccordionItemContent>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" pt="2">
                  <Field label={t('pilot.channels.securityPolicy')}>
                    <NativeSelectRoot>
                      <NativeSelectField
                        value={channel.security.policy}
                        onChange={(e) =>
                          store.updateChannel(index, {
                            security: {
                              policy: e.target.value as ChannelSecurityConfig['policy'],
                            } as Partial<ChannelSecurityConfig> as ChannelSecurityConfig,
                          })
                        }
                        items={['welcome', 'silent', 'custom']}
                      />
                    </NativeSelectRoot>
                  </Field>
                  <Field label={t('pilot.channels.welcomeWindow')}>
                    <NumberInputRoot
                      min={0}
                      value={String(channel.security.welcome_window)}
                      onValueChange={({ value }) =>
                        store.updateChannel(index, {
                          security: {
                            welcome_window: Number(value) || 0,
                          } as Partial<ChannelSecurityConfig> as ChannelSecurityConfig,
                        })
                      }
                    >
                      <NumberInputField />
                    </NumberInputRoot>
                  </Field>
                  <Field label={t('pilot.channels.maxResp')}>
                    <NumberInputRoot
                      min={1}
                      value={String(channel.security.max_resp)}
                      onValueChange={({ value }) =>
                        store.updateChannel(index, {
                          security: {
                            max_resp: Number(value) || 0,
                          } as Partial<ChannelSecurityConfig> as ChannelSecurityConfig,
                        })
                      }
                    >
                      <NumberInputField />
                    </NumberInputRoot>
                  </Field>
                  {channel.security.policy === 'custom' && (
                    <Field label={t('pilot.channels.customText')}>
                      <Input
                        value={channel.security.custom_text}
                        onChange={(e) =>
                          store.updateChannel(index, {
                            security: {
                              custom_text: e.target.value,
                            } as Partial<ChannelSecurityConfig> as ChannelSecurityConfig,
                          })
                        }
                      />
                    </Field>
                  )}
                </SimpleGrid>
              </AccordionItemContent>
            </AccordionItem>
          </Accordion.Root>
        </Box>
      </Box>
    </Box>
  )
})

const ChannelsStep = observer(function ChannelsStep() {
  const store = usePilotStore()
  const { t } = useTranslation()

  return (
    <VStack align="stretch" gap="6">
      <Box>
        <Heading size="lg" fontWeight="bold">{t('pilot.channels.title')}</Heading>
        <Text color="fg.muted" mt="1" fontSize="sm">{t('pilot.channels.description')}</Text>
      </Box>

      {store.channels.length === 0 && (
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="border.muted"
          borderRadius="xl"
          py="12"
          textAlign="center"
        >
          <Icon fontSize="3xl" color="fg.subtle" mb="2"><LuMessageSquare /></Icon>
          <Text color="fg.muted" fontSize="sm">{t('pilot.channels.empty')}</Text>
        </Box>
      )}

      {store.channels.map((_, i) => (
        <ChannelCard key={i} index={i} />
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
        onClick={() => store.addChannel()}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="2"
        color="fg.muted"
        fontWeight="medium"
        fontSize="sm"
      >
        <LuPlus />
        {t('pilot.actions.addChannel')}
      </Box>
    </VStack>
  )
})

export default ChannelsStep
