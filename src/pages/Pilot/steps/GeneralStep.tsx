import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Input,
  HStack,
  Icon,
  RadioCard,
} from '@chakra-ui/react'
import { LuServer, LuScrollText, LuZap, LuSlidersHorizontal } from 'react-icons/lu'
import { Field } from '@/components/ui/field'
import { RadioCardRoot } from '@/components/ui/radio-card'
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select'
import { NumberInputRoot, NumberInputField } from '@/components/ui/number-input'
import { Switch } from '@/components/ui/switch'
import { usePilotStore } from '../store/context'

const GeneralStep = observer(function GeneralStep() {
  const store = usePilotStore()
  const { t } = useTranslation()

  return (
    <VStack align="stretch" gap="8">
      <Box textAlign="center">
        <Heading size="lg" fontWeight="bold">{t('pilot.general.title')}</Heading>
        <Text color="fg.muted" mt="1" fontSize="sm">{t('pilot.general.description')}</Text>
      </Box>

      <RadioCardRoot
        value={store.useDefaultGeneral ? 'defaults' : 'customize'}
        onValueChange={({ value }) =>
          store.setUseDefaultGeneral(value === 'defaults')
        }
      >
        <SimpleGrid columns={2} gap="4">
          <RadioCard.Item value="defaults" cursor="pointer">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <HStack gap="4" align="center" width="full">
                <Icon fontSize="xl" flexShrink={0}><LuZap /></Icon>
                <Box>
                  <RadioCard.ItemText fontWeight="medium">{t('pilot.general.useDefaults')}</RadioCard.ItemText>
                  <RadioCard.ItemDescription>{t('pilot.general.defaultsCardDesc')}</RadioCard.ItemDescription>
                </Box>
              </HStack>
            </RadioCard.ItemControl>
          </RadioCard.Item>
          <RadioCard.Item value="customize" cursor="pointer">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <HStack gap="4" align="center" width="full">
                <Icon fontSize="xl" flexShrink={0}><LuSlidersHorizontal /></Icon>
                <Box>
                  <RadioCard.ItemText fontWeight="medium">{t('pilot.general.customize')}</RadioCard.ItemText>
                  <RadioCard.ItemDescription>{t('pilot.general.customizeCardDesc')}</RadioCard.ItemDescription>
                </Box>
              </HStack>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        </SimpleGrid>
      </RadioCardRoot>

      {store.useDefaultGeneral ? (
        <Box
          borderWidth="1px"
          borderColor="border.muted"
          borderRadius="xl"
          p="5"
          bg={{ base: 'bg.muted', _dark: 'bg.muted' }}
        >
          <Text fontSize="sm" color="fg.muted" lineHeight="tall">
            {t('pilot.general.defaultsDetail')}
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="8">
          {/* Gateway */}
          <Box>
            <HStack gap="2" mb="4">
              <Icon color="fg.muted" fontSize="lg"><LuServer /></Icon>
              <Heading size="md" fontWeight="semibold">{t('pilot.general.gateway')}</Heading>
            </HStack>
            <Box
              borderWidth="1px"
              borderColor="border.muted"
              borderRadius="xl"
              p={{ base: '4', md: '6' }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
                <Field label={t('pilot.general.bind')}>
                  <Input
                    value={store.gateway.bind}
                    onChange={(e) => store.updateGateway({ bind: e.target.value })}
                    placeholder="0.0.0.0:8088"
                  />
                </Field>
                <Field label={t('pilot.general.requestTimeout')}>
                  <NumberInputRoot
                    min={1}
                    value={String(store.gateway.request_timeout)}
                    onValueChange={({ value }) =>
                      store.updateGateway({ request_timeout: Number(value) || 0 })
                    }
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Field>
                <Field label={t('pilot.general.maxSessions')}>
                  <NumberInputRoot
                    min={1}
                    value={String(store.gateway.max_concurrent_sessions)}
                    onValueChange={({ value }) =>
                      store.updateGateway({ max_concurrent_sessions: Number(value) || 0 })
                    }
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Field>
                <Box />
                <Switch
                  checked={store.gateway.enable_metrics}
                  onCheckedChange={({ checked }) =>
                    store.updateGateway({ enable_metrics: !!checked })
                  }
                >
                  {t('pilot.general.enableMetrics')}
                </Switch>
                <Switch
                  checked={store.gateway.auto_update}
                  onCheckedChange={({ checked }) =>
                    store.updateGateway({ auto_update: !!checked })
                  }
                >
                  {t('pilot.general.autoUpdate')}
                </Switch>
              </SimpleGrid>
            </Box>
          </Box>

          {/* Logging */}
          <Box>
            <HStack gap="2" mb="4">
              <Icon color="fg.muted" fontSize="lg"><LuScrollText /></Icon>
              <Heading size="md" fontWeight="semibold">{t('pilot.general.logging')}</Heading>
            </HStack>
            <Box
              borderWidth="1px"
              borderColor="border.muted"
              borderRadius="xl"
              p={{ base: '4', md: '6' }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
                <Field label={t('pilot.general.logLevel')}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={store.logging.level}
                      onChange={(e) =>
                        store.updateLogging({ level: e.target.value as LogLevel })
                      }
                      items={['debug', 'info', 'warn', 'error']}
                    />
                  </NativeSelectRoot>
                </Field>
                <Field label={t('pilot.general.logFormat')}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={store.logging.format}
                      onChange={(e) =>
                        store.updateLogging({ format: e.target.value as 'json' | 'text' })
                      }
                      items={['json', 'text']}
                    />
                  </NativeSelectRoot>
                </Field>
                <Field label={t('pilot.general.logOutput')}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={store.logging.output}
                      onChange={(e) =>
                        store.updateLogging({ output: e.target.value as 'stdout' | 'file' | 'both' })
                      }
                      items={['stdout', 'file', 'both']}
                    />
                  </NativeSelectRoot>
                </Field>

                {(store.logging.output === 'file' || store.logging.output === 'both') && (
                  <>
                    <Field label={t('pilot.general.logFile')}>
                      <Input
                        value={store.logging.file}
                        onChange={(e) => store.updateLogging({ file: e.target.value })}
                        placeholder="logs/friday.log"
                      />
                    </Field>
                    <Field label={t('pilot.general.logMaxSize')}>
                      <NumberInputRoot
                        min={1}
                        value={String(store.logging.max_size)}
                        onValueChange={({ value }) =>
                          store.updateLogging({ max_size: Number(value) || 0 })
                        }
                      >
                        <NumberInputField />
                      </NumberInputRoot>
                    </Field>
                    <Field label={t('pilot.general.logMaxBackups')}>
                      <NumberInputRoot
                        min={0}
                        value={String(store.logging.max_backups)}
                        onValueChange={({ value }) =>
                          store.updateLogging({ max_backups: Number(value) || 0 })
                        }
                      >
                        <NumberInputField />
                      </NumberInputRoot>
                    </Field>
                    <Field label={t('pilot.general.logMaxAge')}>
                      <NumberInputRoot
                        min={1}
                        value={String(store.logging.max_age)}
                        onValueChange={({ value }) =>
                          store.updateLogging({ max_age: Number(value) || 0 })
                        }
                      >
                        <NumberInputField />
                      </NumberInputRoot>
                    </Field>
                  </>
                )}
              </SimpleGrid>
            </Box>
          </Box>
        </VStack>
      )}
    </VStack>
  )
})

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export default GeneralStep
