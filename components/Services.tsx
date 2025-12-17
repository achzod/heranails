'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: 'Classic Manicure',
      duration: '1h30',
      description: 'Complete nail care with semi-permanent polish application',
      features: [
        'Nail preparation and treatment',
        'Hand scrub and massage',
        'Semi-permanent polish application',
        'Perfect finish'
      ],
      highlight: false
    },
    {
      title: 'Luxury Nail Art',
      duration: '1h30',
      description: 'Custom creation with unique and sophisticated designs',
      features: [
        'All classic manicure treatments',
        'Custom design according to your wishes',
        'Advanced techniques (french, ombré, etc.)',
        'Premium rhinestones and decorations'
      ],
      highlight: true
    },
    {
      title: 'Gel/Extensions',
      duration: '1h30',
      description: 'Lengthening and strengthening of natural nails',
      features: [
        'Gel or capsule application',
        'Sculpting and modeling',
        'Design of your choice',
        'Long-lasting glossy finish'
      ],
      highlight: false
    }
  ]

  return (
    <section id="services" className="py-20 md:py-32 luxury-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">
            Complete services to elevate your nails with elegance and refinement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-2xl p-8 ${
                service.highlight 
                  ? 'luxury-shadow ring-2 ring-primary-400 transform scale-105' 
                  : 'luxury-shadow'
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-primary-600 font-semibold text-lg">
                  {service.duration}
                </p>
              </div>

              <p className="text-neutral-600 text-center mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#booking"
                className={`block text-center py-3 rounded-full font-semibold transition-all ${
                  service.highlight
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-xl'
                    : 'border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

