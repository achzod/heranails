'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Check } from 'lucide-react'
import { format, addDays, isSameDay, parse } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DEFAULT_SLOT_TIMES } from '@/lib/slots'

interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])

  // Générer les 14 prochains jours
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i))

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Charger les créneaux disponibles
  useEffect(() => {
    if (isMounted) {
      loadAvailableSlots()
    }
  }, [selectedDate, isMounted])

  const loadAvailableSlots = async () => {
    try {
      const response = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: format(selectedDate, 'yyyy-MM-dd') })
      })
      if (response.ok) {
        const data = await response.json()
        const slots = (data.slots || []) as TimeSlot[]
        setAvailableSlots(slots)
      } else {
        const errorData = await response.json()
        console.error('API Error details:', errorData)
        throw new Error('API failed')
      }
    } catch (error) {
      console.error('Error loading slots:', error)
      // Fallback strict: grille 09:00 -> 19:30 (1h30 sessions)
      setAvailableSlots(
        DEFAULT_SLOT_TIMES.map((t) => ({
          id: `${format(selectedDate, 'yyyy-MM-dd')}-${t}`,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: t,
          available: true,
        }))
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', phone: '', message: '' })
          setSelectedTime('')
        }, 3000)
      } else {
        const errorData = await response.json()
        alert(`Booking failed: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  if (!isMounted) return null

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 md:py-32 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-white rounded-2xl p-12 text-center luxury-shadow"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="text-green-600" size={40} />
            </motion.div>
            <h3 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
              Booking Confirmed!
            </h3>
            <p className="text-neutral-600 mb-2">
              Your appointment is confirmed for
            </p>
            <p className="text-xl font-semibold text-primary-600 mb-6">
              {format(selectedDate, 'EEEE, MMMM d, yyyy', { locale: enUS })} at {selectedTime}
            </p>
            <p className="text-neutral-500 text-sm">
              A confirmation email has been sent to you.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 md:py-32 luxury-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Booking</h2>
          <p className="section-subtitle">
            Choose your time slot and book your manicure session (duration: 1h30)
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl luxury-shadow p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date Selection */}
            <div>
              <label className="flex items-center text-lg font-semibold text-neutral-900 mb-4">
                <Calendar className="mr-2 text-primary-600" size={24} />
                Choose a date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {dates.map((date) => (
                  <motion.button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedTime('')
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl text-center transition-all ${isSameDay(date, selectedDate)
                      ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                      }`}
                  >
                    <div className="text-xs font-semibold">
                      {format(date, 'EEE', { locale: enUS })}
                    </div>
                    <div className="text-2xl font-bold">
                      {format(date, 'd')}
                    </div>
                    <div className="text-xs">
                      {format(date, 'MMM', { locale: enUS })}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="flex items-center text-lg font-semibold text-neutral-900 mb-4">
                <Clock className="mr-2 text-primary-600" size={24} />
                Choose a time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    type="button"
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    whileHover={slot.available ? { scale: 1.05 } : {}}
                    whileTap={slot.available ? { scale: 0.95 } : {}}
                    className={`p-4 rounded-xl font-semibold transition-all ${!slot.available
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      : selectedTime === slot.time
                        ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                      }`}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
                  <User className="mr-2 text-primary-600" size={18} />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
                  <Phone className="mr-2 text-primary-600" size={18} />
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
                <Mail className="mr-2 text-primary-600" size={18} />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-neutral-700 mb-2">
                <MessageSquare className="mr-2 text-primary-600" size={18} />
                Message (optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gold-500 focus:outline-none transition-colors resize-none"
                placeholder="Describe the manicure style you want..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selectedTime}
              className="w-full btn-luxury py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm My Booking
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  )
}

