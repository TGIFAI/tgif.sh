import { Box, Container, Flex, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const columns = [
    {
      title: t('footer.product'),
      links: [
        { label: t('footer.features'), href: '#features' },
        { label: t('footer.docs'), href: '#' },
      ],
    },
    {
      title: t('footer.community'),
      links: [
        { label: t('footer.github'), href: 'https://github.com/tgifai/friday', external: true },
        { label: t('footer.issues'), href: 'https://github.com/tgifai/friday/issues', external: true },
      ],
    },
    {
      title: t('footer.project'),
      links: [
        { label: t('footer.blog'), href: '#' },
        { label: t('footer.license'), href: 'https://github.com/tgifai/friday/blob/main/LICENSE', external: true },
      ],
    },
  ]

  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border.muted">
      <Container maxW="5xl" px={{ base: '4', md: '6' }} py={{ base: '10', md: '16' }}>
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap="8">
          {columns.map((col) => (
            <Stack key={col.title} gap="3">
              <Text fontWeight="semibold" fontSize="sm">{col.title}</Text>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  variant="plain"
                  fontSize="sm"
                  color="fg.muted"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          ))}
        </SimpleGrid>
        <Flex
          mt="12"
          pt="6"
          borderTopWidth="1px"
          borderColor="border.muted"
          justify="center"
        >
          <Text fontSize="sm" color="fg.muted">
            © {new Date().getFullYear()} {t('footer.builtBy')}
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
