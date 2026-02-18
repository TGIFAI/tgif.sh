import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <HStack gap="1">
      <Button
        size="sm"
        variant={i18n.language === 'en' ? 'solid' : 'ghost'}
        onClick={() => i18n.changeLanguage('en')}
      >
        {t('language.en')}
      </Button>
      <Button
        size="sm"
        variant={i18n.language?.startsWith('zh') ? 'solid' : 'ghost'}
        onClick={() => i18n.changeLanguage('zh')}
      >
        {t('language.zh')}
      </Button>
    </HStack>
  )
}
