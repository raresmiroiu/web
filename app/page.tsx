import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import Footer from '@/components/Footer'
import Start from '@/components/landing/Start'
import "@/app/landing.css"

const page = () => {
  return (
    <main style={{
      background:"#0d0f0e",
      color:"#e8e4db",
      fontFamily:"'Outfit',sans-serif",
      minHeight:"100vh"
    }}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Start />
      <Footer />
    </main>
  )
}

export default page