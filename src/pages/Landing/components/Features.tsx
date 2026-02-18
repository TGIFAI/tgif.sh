import { Box, Card, Container, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuMessageSquare, LuBrain, LuPackage, LuShield, LuPuzzle, LuRocket } from 'react-icons/lu'
import type { IconType } from 'react-icons'

interface Feature {
  icon: IconType
  titleKey: string
  descKey: string
}

const features: Feature[] = [
  { icon: LuMessageSquare, titleKey: 'features.multiChannel.title', descKey: 'features.multiChannel.description' },
  { icon: LuBrain, titleKey: 'features.multiLLM.title', descKey: 'features.multiLLM.description' },
  { icon: LuPackage, titleKey: 'features.singleBinary.title', descKey: 'features.singleBinary.description' },
  { icon: LuShield, titleKey: 'features.sandbox.title', descKey: 'features.sandbox.description' },
  { icon: LuPuzzle, titleKey: 'features.skills.title', descKey: 'features.skills.description' },
  { icon: LuRocket, titleKey: 'features.easyDeploy.title', descKey: 'features.easyDeploy.description' },
]

export default function Features() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="features" py="20">
      <Container maxW="7xl">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb="12">
          {t('features.sectionTitle')}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {features.map((f) => (
            <Card.Root key={f.titleKey} variant="outline">
              <Card.Body gap="3">
                <Icon fontSize="2xl" color="fg.muted">
                  <f.icon />
                </Icon>
                <Heading as="h3" fontSize="lg" fontWeight="semibold">
                  {t(f.titleKey)}
                </Heading>
                <Text fontSize="sm" color="fg.muted">
                  {t(f.descKey)}
                </Text>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
