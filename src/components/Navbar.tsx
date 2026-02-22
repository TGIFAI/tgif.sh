import { Box, Container, Flex, HStack, IconButton, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { ColorModeButton } from '@/components/ui/color-mode'
import LanguageSwitcher from '@/components/LanguageSwitcher'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
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

  const handleNavClick = (id: string) => {
    if (isLanding) {
      scrollTo(id)
    } else {
      navigate(`/#${id}`)
    }
  }

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
      <Container maxW="6xl" px={{ base: '4', md: '6' }} py="3">
        <Flex align="center" justify="space-between">
          <Link asChild _hover={{ textDecoration: 'none' }} variant="plain">
            <RouterLink to="/">
              <HStack gap="2.5">
                <Box w="3" h="3" borderRadius="sm" bg="green.500" />
                <Box fontWeight="700" fontSize="lg" letterSpacing="-0.02em">
                  Friday
                </Box>
              </HStack>
            </RouterLink>
          </Link>

          {/* Desktop nav */}
          <HStack gap="6" display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                variant="plain"
                cursor="pointer"
                fontSize="sm"
                fontWeight="medium"
                color="fg.muted"
                _hover={{ color: 'fg' }}
                transition="color 0.2s"
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              asChild
              fontSize="sm"
              fontWeight="medium"
              variant="plain"
              color="fg.muted"
              _hover={{ color: 'fg' }}
              transition="color 0.2s"
            >
              <RouterLink to="/pilot">{t('nav.pilot')}</RouterLink>
            </Link>
            <Link
              variant="plain"
              href="https://github.com/tgifai/friday"
              target="_blank"
              fontSize="sm"
              fontWeight="medium"
              color="fg.muted"
              _hover={{ color: 'fg' }}
              transition="color 0.2s"
            >
              {t('nav.github')}
            </Link>
          </HStack>

          <HStack gap="1">
            <LanguageSwitcher />
            <ColorModeButton css={{ _icon: { width: '4', height: '4' } }} />
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
            {navLinks.map((link) => (
              <Link
                key={link.id}
                variant="plain"
                cursor="pointer"
                fontSize="sm"
                color="fg.muted"
                onClick={() => { handleNavClick(link.id); setMobileOpen(false) }}
              >
                {link.label}
              </Link>
            ))}
            <Link asChild fontSize="sm" variant="plain" color="fg.muted" onClick={() => setMobileOpen(false)}>
              <RouterLink to="/pilot">{t('nav.pilot')}</RouterLink>
            </Link>
            <Link variant="plain" href="https://github.com/tgifai/friday" target="_blank" fontSize="sm" color="fg.muted">
              {t('nav.github')}
            </Link>
          </Flex>
        )}
      </Container>
    </Box>
  )
}
