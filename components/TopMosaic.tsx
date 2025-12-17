'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { instagramImages } from '@/components/instagramImages'

export default function TopMosaic() {
  const picks = instagramImages.slice(0, 6)

  return (
    <section aria-label="Highlights" className="relative -mt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-luxe overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-ink-900/10">
            <p className="kicker">Selected works</p>
            <a href="#gallery" className="kicker hover:text-ink-900 transition-colors">
              View all
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-[1px] bg-ink-900/10">
            {picks.map((p, idx) => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => (window.location.hash = 'gallery')}
                className="relative aspect-[4/5] bg-ivory-50 overflow-hidden group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}




