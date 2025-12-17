'use client'

import { motion } from 'framer-motion'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const contactInfo = [
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@nailsby_hera',
      link: 'https://www.instagram.com/nailsby_hera/',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@nailsbyhera.fr',
      link: 'mailto:contact@nailsbyhera.fr',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 6 XX XX XX XX',
      link: 'tel:+33600000000',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Dubai, UAE',
      link: '#',
      color: 'from-red-500 to-orange-500'
    }
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Have a question? Don't hesitate to contact me, I'll be happy to answer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              target={info.link.startsWith('http') ? '_blank' : '_self'}
              rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white rounded-2xl p-6 text-center luxury-shadow group cursor-pointer"
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${info.color} mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <info.icon className="text-white" size={28} />
              </motion.div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {info.title}
              </h3>
              <p className="text-neutral-600 text-sm group-hover:text-primary-600 transition-colors">
                {info.value}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Ready to Elevate Your Nails?
            </h3>
            <p className="text-neutral-600 mb-6 max-w-2xl">
              Book your session now and treat yourself to a unique beauty experience
            </p>
            <motion.a
              href="#booking"
              className="btn-luxury inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

