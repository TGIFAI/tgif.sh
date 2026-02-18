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
