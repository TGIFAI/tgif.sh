import { Box, Container, Flex, HStack, IconButton, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { ColorModeButton } from '@/components/ui/color-mode'
import LanguageSwitcher from '@/components/LanguageSwitcher'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t('nav.features'), id: 'features' },
    { label: t('nav.quickStart'), id: 'quick-start' },
  ]

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      bg={scrolled ? { base: 'bg/80' } : 'transparent'}
      backdropFilter={scrolled ? 'blur(12px)' : 'none'}
      borderBottomWidth={scrolled ? '1px' : '0'}
      borderColor="border.muted"
      transition="all 0.2s"
    >
      <Container maxW="5xl" px={{ base: '4', md: '6' }} py="3">
        <Flex align="center" justify="space-between">
          <Text fontWeight="bold" fontSize="xl" cursor="pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Friday
          </Text>

          {/* Desktop nav */}
          <HStack gap="6" display={{ base: 'none', md: 'flex' }}>
            {isLanding && navLinks.map((link) => (
              <Link key={link.id} variant="plain" cursor="pointer" fontSize="sm" fontWeight="medium" onClick={() => scrollTo(link.id)}>
                {link.label}
              </Link>
            ))}
            <Link asChild fontSize="sm" fontWeight="medium" variant="plain">
              <RouterLink to="/pilot">{t('nav.pilot')}</RouterLink>
            </Link>
            <Link variant="plain" href="https://github.com/tgifai/friday" target="_blank" fontSize="sm" fontWeight="medium">
              {t('nav.github')}
            </Link>
          </HStack>

          <HStack gap="2">
            <LanguageSwitcher />
            <ColorModeButton />
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              variant="ghost"
              aria-label="Menu"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <LuX /> : <LuMenu />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile menu */}
        {mobileOpen && (
          <Flex direction="column" gap="4" py="4" display={{ md: 'none' }}>
            {isLanding && navLinks.map((link) => (
              <Link key={link.id} variant="plain" cursor="pointer" fontSize="sm" onClick={() => { scrollTo(link.id); setMobileOpen(false) }}>
                {link.label}
              </Link>
            ))}
            <Link asChild fontSize="sm" variant="plain" onClick={() => setMobileOpen(false)}>
              <RouterLink to="/pilot">{t('nav.pilot')}</RouterLink>
            </Link>
            <Link variant="plain" href="https://github.com/tgifai/friday" target="_blank" fontSize="sm">
              {t('nav.github')}
            </Link>
          </Flex>
        )}
      </Container>
    </Box>
  )
}
