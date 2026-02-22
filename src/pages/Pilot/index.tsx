import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Box,
  Container,
  HStack,
  Button,
  Heading,
  Text,
  Icon,
  Alert,
} from '@chakra-ui/react'
import {
  LuSettings,
  LuBrain,
  LuMessageSquare,
  LuBot,
  LuFileCode,
  LuArrowLeft,
  LuArrowRight,
} from 'react-icons/lu'
import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsContent,
} from '@/components/ui/steps'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PilotProvider, usePilotStore } from './store/context'
import { validateStep } from './validation'
import GeneralStep from './steps/GeneralStep'
import ProvidersStep from './steps/ProvidersStep'
import ChannelsStep from './steps/ChannelsStep'
import AgentsStep from './steps/AgentsStep'
import ReviewStep from './steps/ReviewStep'

const STEP_ICONS = [LuSettings, LuBrain, LuMessageSquare, LuBot, LuFileCode]

const PilotWizard = observer(function PilotWizard() {
  const store = usePilotStore()
  const { t } = useTranslation()
  const [errors, setErrors] = useState<string[]>([])

  const steps = [
    { title: t('pilot.steps.general'), description: t('pilot.steps.generalDesc') },
    { title: t('pilot.steps.providers'), description: t('pilot.steps.providersDesc') },
    { title: t('pilot.steps.channels'), description: t('pilot.steps.channelsDesc') },
    { title: t('pilot.steps.agents'), description: t('pilot.steps.agentsDesc') },
    { title: t('pilot.steps.review'), description: t('pilot.steps.reviewDesc') },
  ]

  function handleNext() {
    const stepErrors = validateStep(store, store.currentStep)
    setErrors(stepErrors)
    if (stepErrors.length === 0) {
      store.nextStep()
    }
  }

  return (
    <Box>
      <StepsRoot
        step={store.currentStep}
        onStepChange={({ step }: { step: number }) => {
          setErrors([])
          store.setStep(step)
        }}
        count={steps.length}
        linear
        size="sm"
      >
        <Box
          bg={{ base: 'bg.muted', _dark: 'bg.muted' }}
          borderRadius="xl"
          p={{ base: '4', md: '6' }}
          mb="8"
        >
          <StepsList>
            {steps.map((s, i) => (
              <StepsItem
                key={i}
                index={i}
                title={s.title}
                description={s.description}
                icon={<Icon><StepIcon index={i} /></Icon>}
              />
            ))}
          </StepsList>
        </Box>

        <StepsContent index={0}><GeneralStep /></StepsContent>
        <StepsContent index={1}><ProvidersStep /></StepsContent>
        <StepsContent index={2}><ChannelsStep /></StepsContent>
        <StepsContent index={3}><AgentsStep /></StepsContent>
        <StepsContent index={4}><ReviewStep /></StepsContent>
      </StepsRoot>

      {errors.length > 0 && (
        <Alert.Root status="error" mt="5" borderRadius="lg">
          <Alert.Indicator />
          <Box>
            {errors.map((err, i) => (
              <Alert.Description key={i} display="block">{err}</Alert.Description>
            ))}
          </Box>
        </Alert.Root>
      )}

      <HStack mt="8" justify="space-between">
        <Box>
          {store.currentStep > 0 && (
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                setErrors([])
                store.prevStep()
              }}
            >
              <LuArrowLeft />
              {t('pilot.actions.previous')}
            </Button>
          )}
        </Box>
        <Box>
          {store.currentStep < 4 && (
            <Button size="lg" onClick={handleNext}>
              {t('pilot.actions.next')}
              <LuArrowRight />
            </Button>
          )}
        </Box>
      </HStack>
    </Box>
  )
})

function StepIcon({ index }: { index: number }) {
  const IconComponent = STEP_ICONS[index]
  return <IconComponent />
}

export default function Pilot() {
  const { t } = useTranslation()

  return (
    <PilotProvider>
      <Box minH="100vh">
        <Navbar />
        {/* Hero header */}
        <Box pt={{ base: '24', md: '32' }} pb={{ base: '8', md: '12' }} textAlign="center">
          <Container maxW="3xl">
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="extrabold"
              lineHeight="tight"
            >
              {t('pilot.title')}
            </Heading>
            <Text mt="3" fontSize={{ base: 'md', md: 'lg' }} color="fg.muted" maxW="xl" mx="auto">
              {t('pilot.subtitle')}
            </Text>
          </Container>
        </Box>

        <Box pb="20">
          <Container maxW="4xl">
            <PilotWizard />
          </Container>
        </Box>
        <Footer />
      </Box>
    </PilotProvider>
  )
}
