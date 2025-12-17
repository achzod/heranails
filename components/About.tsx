'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Star } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Each nail is a work of art created with love and dedication'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Professional techniques and premium quality products'
    },
    {
      icon: Star,
      title: 'Personalization',
      description: 'Unique creations tailored to your style and personality'
    }
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Hera</h2>
          <p className="section-subtitle">
            Passionate about the art of manicure, I transform your nails into true jewels. 
            Each session is a privileged moment dedicated to your beauty and well-being.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-50 mb-6 luxury-shadow"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="text-primary-600" size={36} />
              </motion.div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-serif italic text-neutral-700 max-w-4xl mx-auto">
            "Beauty begins at your fingertips. Let me create a manicure that reflects your unique personality."
          </blockquote>
          <p className="mt-6 text-primary-600 font-semibold text-lg">— Hera</p>
        </motion.div>
      </div>
    </section>
  )
}

