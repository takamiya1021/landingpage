import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import CourseContent from './components/sections/CourseContent'
import Pricing from './components/sections/Pricing'
import Testimonials from './components/sections/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <Features />
      <CourseContent />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}