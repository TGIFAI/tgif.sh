import { Box, Container, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuMessageSquare, LuBrain, LuPackage, LuShield, LuPuzzle, LuDatabase } from 'react-icons/lu'
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
  { icon: LuDatabase, titleKey: 'features.smartMemory.title', descKey: 'features.smartMemory.description' },
]

export default function Features() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="features" py={{ base: '16', md: '24' }}>
      <Container maxW="6xl" px={{ base: '4', md: '6' }}>
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="700"
          textAlign="center"
          mb={{ base: '10', md: '14' }}
          letterSpacing="-0.02em"
        >
          {t('features.sectionTitle')}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
          {features.map((f, i) => (
            <Box
              key={f.titleKey}
              p="6"
              borderWidth="1px"
              borderColor="border.muted"
              borderRadius="xl"
              transition="all 0.2s ease"
              cursor="default"
              _hover={{
                borderColor: 'green.500/40',
                transform: 'translateY(-2px)',
                shadow: '0 8px 24px -8px rgba(16, 185, 129, 0.12)',
              }}
              style={{ animation: 'fadeInUp 0.5s ease-out both', animationDelay: `${i * 0.08}s` }}
            >
              <Box
                w="10"
                h="10"
                borderRadius="lg"
                bg={{ base: 'green.50', _dark: 'green.500/10' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="green.500"
                mb="4"
              >
                <Icon fontSize="lg"><f.icon /></Icon>
              </Box>
              <Heading as="h3" fontSize="md" fontWeight="600" mb="2">
                {t(f.titleKey)}
              </Heading>
              <Text fontSize="sm" color="fg.muted" lineHeight="relaxed">
                {t(f.descKey)}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
