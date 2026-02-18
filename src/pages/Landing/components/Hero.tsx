import { Box, Button, Container, Heading, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuArrowRight, LuGithub } from 'react-icons/lu'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <Box as="section" pt="32" pb="20">
      <Container maxW="4xl" textAlign="center">
        <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} fontWeight="extrabold" lineHeight="tight">
          {t('hero.title')}
        </Heading>
        <Text mt="4" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="medium" color="fg.muted">
          {t('hero.subtitle')}
        </Text>
        <Text mt="4" fontSize={{ base: 'md', md: 'lg' }} color="fg.muted" maxW="2xl" mx="auto">
          {t('hero.description')}
        </Text>
        <HStack mt="8" justify="center" gap="4" flexWrap="wrap">
          <Button size="lg" onClick={() => scrollTo('quick-start')}>
            {t('hero.getStarted')}
            <LuArrowRight />
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/tgifai/friday" target="_blank" rel="noopener noreferrer">
              <LuGithub />
              {t('hero.viewOnGithub')}
            </a>
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}
