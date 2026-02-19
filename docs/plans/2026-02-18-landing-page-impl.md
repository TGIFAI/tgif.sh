# Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page scrolling landing page for the Friday AI assistant with Navbar, Hero, Features, Quick Start, Integrations, and Footer sections.

**Architecture:** Single-page scroll with anchor navigation. Page-scoped components under `pages/Landing/components/`, shared components in `components/`. All text via i18n `t()`. Chakra UI v3 style props for layout and theming (dark/light dual mode).

**Tech Stack:** React 19, TypeScript, Vite 7, Chakra UI v3, react-router-dom, react-i18next, normalize.css

---

### Task 1: i18n — Complete all translation keys

**Files:**
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/zh.json`

**Step 1: Replace en.json with full translation keys**

```json
{
  "nav": {
    "features": "Features",
    "quickStart": "Quick Start",
    "github": "GitHub"
  },
  "hero": {
    "title": "Thank God It's Friday",
    "subtitle": "Your Personal AI Assistant",
    "description": "A Go-based multi-agent framework that routes messages from your favorite chat apps to LLM-powered agents. Open source, self-hosted, fully extensible.",
    "getStarted": "Get Started",
    "viewOnGithub": "View on GitHub"
  },
  "features": {
    "sectionTitle": "What Friday Does",
    "multiChannel": {
      "title": "Multi-Channel",
      "description": "Connect Telegram, Lark, or HTTP API — route messages from any chat platform to your agents."
    },
    "multiLLM": {
      "title": "Multi-LLM + Fallback",
      "description": "OpenAI, Anthropic, Gemini, Ollama, Qwen — switch models freely with automatic fallback."
    },
    "singleBinary": {
      "title": "Single Binary",
      "description": "One binary, runs anywhere. Cross-compile for Linux, macOS, and Windows with ease."
    },
    "sandbox": {
      "title": "Sandbox Security",
      "description": "Tool calls execute in an isolated sandbox, protecting your system environment."
    },
    "skills": {
      "title": "Skills System",
      "description": "Extensible behavior plugins in YAML + Markdown. Build your own or use community skills."
    },
    "easyDeploy": {
      "title": "Easy Deploy",
      "description": "Docker or Go install — get running in minutes, not hours."
    }
  },
  "quickStart": {
    "sectionTitle": "Quick Start",
    "goTab": "Go Install",
    "dockerTab": "Docker",
    "goCode": "go install github.com/tgifai/friday@latest\nfriday serve -c config.yaml",
    "dockerCode": "docker run -d \\\n  -v ./config.yaml:/app/config.yaml \\\n  tgifai/friday"
  },
  "integrations": {
    "sectionTitle": "Integrations",
    "channels": "Channels",
    "providers": "LLM Providers"
  },
  "footer": {
    "product": "Product",
    "community": "Community",
    "project": "Project",
    "features": "Features",
    "docs": "Docs",
    "github": "GitHub",
    "issues": "Issues",
    "blog": "Blog",
    "license": "License",
    "builtBy": "Built by TGIF AI"
  },
  "language": {
    "en": "EN",
    "zh": "中文"
  }
}
```

**Step 2: Replace zh.json with full translation keys**

```json
{
  "nav": {
    "features": "功能",
    "quickStart": "快速开始",
    "github": "GitHub"
  },
  "hero": {
    "title": "Thank God It's Friday",
    "subtitle": "你的个人 AI 助手",
    "description": "一个基于 Go 的多智能体框架，将你常用聊天应用的消息路由到 LLM 驱动的 Agent。开源、自托管、完全可扩展。",
    "getStarted": "快速开始",
    "viewOnGithub": "在 GitHub 上查看"
  },
  "features": {
    "sectionTitle": "Friday 能做什么",
    "multiChannel": {
      "title": "多渠道接入",
      "description": "连接 Telegram、Lark 或 HTTP API —— 将任意聊天平台的消息路由到你的 Agent。"
    },
    "multiLLM": {
      "title": "多模型 + 自动回退",
      "description": "OpenAI、Anthropic、Gemini、Ollama、Qwen —— 自由切换模型，支持自动回退。"
    },
    "singleBinary": {
      "title": "单 Binary 运行",
      "description": "一个 binary 直接运行，支持 Linux、macOS、Windows 交叉编译。"
    },
    "sandbox": {
      "title": "沙箱安全",
      "description": "Tool call 在隔离的沙箱中执行，保护你的系统环境。"
    },
    "skills": {
      "title": "Skills 扩展系统",
      "description": "基于 YAML + Markdown 的可扩展行为插件。构建你自己的或使用社区 Skills。"
    },
    "easyDeploy": {
      "title": "轻松部署",
      "description": "Docker 或 Go install —— 几分钟内完成部署。"
    }
  },
  "quickStart": {
    "sectionTitle": "快速开始",
    "goTab": "Go 安装",
    "dockerTab": "Docker",
    "goCode": "go install github.com/tgifai/friday@latest\nfriday serve -c config.yaml",
    "dockerCode": "docker run -d \\\n  -v ./config.yaml:/app/config.yaml \\\n  tgifai/friday"
  },
  "integrations": {
    "sectionTitle": "集成",
    "channels": "渠道",
    "providers": "LLM 提供商"
  },
  "footer": {
    "product": "产品",
    "community": "社区",
    "project": "项目",
    "features": "功能",
    "docs": "文档",
    "github": "GitHub",
    "issues": "Issues",
    "blog": "博客",
    "license": "开源协议",
    "builtBy": "由 TGIF AI 构建"
  },
  "language": {
    "en": "EN",
    "zh": "中文"
  }
}
```

**Step 3: Build to verify no issues**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/i18n/locales/en.json src/i18n/locales/zh.json
git commit -m "feat: add complete i18n translation keys for landing page"
```

---

### Task 2: LanguageSwitcher — Global shared component

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`

**Step 1: Create LanguageSwitcher component**

```tsx
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
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/LanguageSwitcher.tsx
git commit -m "feat: add LanguageSwitcher component"
```

---

### Task 3: Navbar — Global shared component

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: Create Navbar component**

Uses fixed positioning, backdrop blur on scroll (via scroll state), anchor links, ColorModeButton from Chakra snippets, LanguageSwitcher, and mobile hamburger drawer.

```tsx
import { Box, Container, Flex, HStack, IconButton, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuMenu, LuX } from 'react-icons/lu'
import { ColorModeButton } from '@/components/ui/color-mode'
import LanguageSwitcher from '@/components/LanguageSwitcher'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const { t } = useTranslation()
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
      <Container maxW="7xl" py="3">
        <Flex align="center" justify="space-between">
          <Text fontWeight="bold" fontSize="xl" cursor="pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Friday
          </Text>

          {/* Desktop nav */}
          <HStack gap="6" display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link key={link.id} variant="plain" cursor="pointer" fontSize="sm" fontWeight="medium" onClick={() => scrollTo(link.id)}>
                {link.label}
              </Link>
            ))}
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
            {navLinks.map((link) => (
              <Link key={link.id} variant="plain" cursor="pointer" fontSize="sm" onClick={() => { scrollTo(link.id); setMobileOpen(false) }}>
                {link.label}
              </Link>
            ))}
            <Link variant="plain" href="https://github.com/tgifai/friday" target="_blank" fontSize="sm">
              {t('nav.github')}
            </Link>
          </Flex>
        )}
      </Container>
    </Box>
  )
}
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar with scroll blur, mobile menu, and theme/lang toggle"
```

---

### Task 4: Footer — Global shared component

**Files:**
- Create: `src/components/Footer.tsx`

**Step 1: Create Footer component**

```tsx
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
      <Container maxW="7xl" py="12">
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
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with three-column links layout"
```

---

### Task 5: Hero section — Landing page component

**Files:**
- Create: `src/pages/Landing/components/Hero.tsx`

**Step 1: Create Hero component**

```tsx
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
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/pages/Landing/components/Hero.tsx
git commit -m "feat: add Hero section with CTAs"
```

---

### Task 6: Features section — Landing page component

**Files:**
- Create: `src/pages/Landing/components/Features.tsx`

**Step 1: Create Features component**

```tsx
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
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/pages/Landing/components/Features.tsx
git commit -m "feat: add Features section with 6 cards grid"
```

---

### Task 7: QuickStart section — Landing page component

**Files:**
- Create: `src/pages/Landing/components/QuickStart.tsx`

**Step 1: Create QuickStart component**

Uses Chakra Tabs for Go/Docker toggle and the Clipboard snippet for copy button.

```tsx
import { Box, Code, Container, Heading, Tabs, Flex, IconButton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LuTerminal, LuContainer, LuClipboard, LuCheck } from 'react-icons/lu'
import { ClipboardRoot, ClipboardTrigger } from '@/components/ui/clipboard'

function CodeBlock({ code }: { code: string }) {
  return (
    <Box position="relative" mt="4">
      <ClipboardRoot value={code}>
        <Code
          display="block"
          whiteSpace="pre"
          p="5"
          rounded="lg"
          fontSize="sm"
          overflowX="auto"
          bg={{ base: 'gray.100', _dark: 'gray.900' }}
        >
          {code}
        </Code>
        <ClipboardTrigger asChild>
          <IconButton
            variant="ghost"
            size="sm"
            position="absolute"
            top="2"
            right="2"
            aria-label="Copy"
          >
            <LuClipboard />
          </IconButton>
        </ClipboardTrigger>
      </ClipboardRoot>
    </Box>
  )
}

export default function QuickStart() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="quick-start" py="20">
      <Container maxW="3xl">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb="12">
          {t('quickStart.sectionTitle')}
        </Heading>
        <Tabs.Root defaultValue="go" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="go">
              <LuTerminal />
              {t('quickStart.goTab')}
            </Tabs.Trigger>
            <Tabs.Trigger value="docker">
              <LuContainer />
              {t('quickStart.dockerTab')}
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="go">
            <CodeBlock code={t('quickStart.goCode')} />
          </Tabs.Content>
          <Tabs.Content value="docker">
            <CodeBlock code={t('quickStart.dockerCode')} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  )
}
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/pages/Landing/components/QuickStart.tsx
git commit -m "feat: add QuickStart section with tabbed code blocks and copy button"
```

---

### Task 8: Integrations section — Landing page component

**Files:**
- Create: `src/pages/Landing/components/Integrations.tsx`

**Step 1: Create Integrations component**

Text-based badges for channels and providers (no external logo images needed).

```tsx
import { Badge, Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const channels = ['Telegram', 'Lark', 'HTTP API']
const providers = ['OpenAI', 'Anthropic', 'Gemini', 'Ollama', 'Qwen']

export default function Integrations() {
  const { t } = useTranslation()

  return (
    <Box as="section" id="integrations" py="20">
      <Container maxW="4xl">
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" textAlign="center" mb="12">
          {t('integrations.sectionTitle')}
        </Heading>
        <VStack gap="10">
          <VStack gap="4">
            <Text fontWeight="semibold" fontSize="sm" color="fg.muted">{t('integrations.channels')}</Text>
            <HStack gap="3" flexWrap="wrap" justify="center">
              {channels.map((name) => (
                <Badge key={name} size="lg" variant="outline" px="4" py="2" fontSize="sm">
                  {name}
                </Badge>
              ))}
            </HStack>
          </VStack>
          <VStack gap="4">
            <Text fontWeight="semibold" fontSize="sm" color="fg.muted">{t('integrations.providers')}</Text>
            <HStack gap="3" flexWrap="wrap" justify="center">
              {providers.map((name) => (
                <Badge key={name} size="lg" variant="outline" px="4" py="2" fontSize="sm">
                  {name}
                </Badge>
              ))}
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/pages/Landing/components/Integrations.tsx
git commit -m "feat: add Integrations section with channel and provider badges"
```

---

### Task 9: Landing page assembly + routing update

**Files:**
- Create: `src/pages/Landing/index.tsx`
- Modify: `src/App.tsx`
- Delete: `src/pages/Home.tsx`

**Step 1: Create Landing/index.tsx**

```tsx
import { Box } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import Features from './components/Features'
import QuickStart from './components/QuickStart'
import Integrations from './components/Integrations'

export default function Landing() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Hero />
      <Features />
      <QuickStart />
      <Integrations />
      <Footer />
    </Box>
  )
}
```

**Step 2: Update App.tsx to use Landing**

```tsx
import { Routes, Route } from 'react-router-dom'
import Landing from '@/pages/Landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  )
}

export default App
```

**Step 3: Delete old Home.tsx**

```bash
rm src/pages/Home.tsx
```

**Step 4: Build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/pages/Landing/index.tsx src/App.tsx
git rm src/pages/Home.tsx
git commit -m "feat: assemble Landing page and update routing"
```

---

### Task 10: Final verification

**Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Lint**

Run: `npm run lint`
Expected: No lint errors

**Step 3: Dev server smoke test**

Run: `npm run dev`
Expected: Page loads at localhost, all sections visible, dark/light toggle works, language switch works, anchor scroll works, code copy works

**Step 4: Commit any fixes if needed**
