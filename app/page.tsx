'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import TopMosaic from '@/components/TopMosaic'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Services from '@/components/Services'
import Booking from '@/components/Booking'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TopMosaic />
      <About />
      <Services />
      <Gallery />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}

