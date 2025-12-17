'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4">
              Nailsby Hera
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              The art of beauty at your fingertips. Unique and luxurious creations to elevate your nails.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-primary-400">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Booking', id: 'booking' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-primary-400">
              Follow Me
            </h4>
            <a
              href="https://www.instagram.com/nailsby_hera/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:scale-105 transition-transform"
            >
              <Instagram size={24} />
              <span className="font-semibold">@nailsby_hera</span>
            </a>
            <p className="text-neutral-400 mt-4 text-sm">
              Discover my latest creations and daily inspirations
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Nailsby Hera. All rights reserved.
            </p>
            <motion.p
              className="text-neutral-400 text-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart className="text-primary-500 fill-current" size={16} /> in Dubai
            </motion.p>
          </div>
        </div>

        {/* Admin Link */}
        <div className="mt-4 text-center">
          <a
            href="/admin"
            className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}

