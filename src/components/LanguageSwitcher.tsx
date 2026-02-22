import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuGlobe } from 'react-icons/lu'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isZh = i18n.language?.startsWith('zh')

  const toggle = () => {
    i18n.changeLanguage(isZh ? 'en' : 'zh')
  }

  return (
    <Button
      aria-label={isZh ? 'Switch to English' : '切换到中文'}
      size="sm"
      variant="ghost"
      onClick={toggle}
      px="2"
      fontWeight="medium"
      fontSize="xs"
      css={{
        _icon: {
          width: '4',
          height: '4',
        },
      }}
    >
      <LuGlobe />
      {isZh ? '中' : 'EN'}
    </Button>
  )
}
