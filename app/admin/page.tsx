'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Trash2, Check, X, LogOut } from 'lucide-react'
import { format, addDays, isSameDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DEFAULT_SLOT_TIMES } from '@/lib/slots'

interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
}

interface Booking {
  id: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [password, setPassword] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [newSlotTime, setNewSlotTime] = useState('')
  const [activeTab, setActiveTab] = useState<'slots' | 'bookings'>('slots')

  const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i))

  useEffect(() => {
    setIsMounted(true)
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && isMounted) {
      loadSlots()
      loadBookings()
    }
  }, [isAuthenticated, selectedDate, isMounted])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication (replace with real authentication in production)
    if (password === 'hera2024') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  const loadSlots = async () => {
    try {
      const response = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: format(selectedDate, 'yyyy-MM-dd') })
      })
      if (response.ok) {
        const data = await response.json()
        setSlots(data.slots || [])
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const loadBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const addSlot = async () => {
    if (!newSlotTime) return

    try {
      const response = await fetch('/api/slots/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: newSlotTime
        })
      })

      if (response.ok) {
        setNewSlotTime('')
        loadSlots()
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const deleteSlot = async (slotId: string) => {
    try {
      const response = await fetch('/api/slots/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId })
      })

      if (response.ok) {
        loadSlots()
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const toggleSlotAvailability = async (slotId: string, available: boolean) => {
    try {
      const response = await fetch('/api/slots/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: format(selectedDate, 'yyyy-MM-dd'), time: slotId, available: !available })
      })

      if (response.ok) {
        loadSlots()
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  if (!isMounted) return null

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen luxury-gradient flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full luxury-shadow"
        >
          <h1 className="font-serif text-3xl font-bold text-center mb-2 text-gray-800">
            Admin Panel
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to manage your time slots
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-luxury py-3"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-800">
                Nailsby Hera Admin
              </h1>
              <p className="text-sm text-gray-600">
                Manage your time slots and bookings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('slots')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'slots'
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white text-neutral-600 hover:bg-neutral-50'
              }`}
          >
            Manage Time Slots
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'bookings'
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white text-neutral-600 hover:bg-neutral-50'
              }`}
          >
            Bookings ({bookings.length})
          </button>
        </div>

        {activeTab === 'slots' ? (
          <div className="space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Select a date</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg text-center transition-all ${isSameDay(date, selectedDate)
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                      }`}
                  >
                    <div className="text-xs">{format(date, 'EEE', { locale: enUS })}</div>
                    <div className="text-lg font-bold">{format(date, 'd')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">
                Slots for {format(selectedDate, 'MMMM d, yyyy', { locale: enUS })}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Working hours: 09:00–21:00 • Session duration: 1h30 • Toggle availability per slot.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {DEFAULT_SLOT_TIMES.map((time) => {
                  const slot = slots.find((s) => s.time === time)
                  const isAvailable = slot?.available ?? true
                  return (
                    <div
                      key={time}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-gray-800">{time}</span>
                        <button
                          onClick={() => toggleSlotAvailability(time, isAvailable)}
                          className={`p-1 rounded ${isAvailable ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'
                            }`}
                          title={isAvailable ? 'Available' : 'Unavailable'}
                        >
                          {isAvailable ? <Check size={20} /> : <X size={20} />}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-6">Bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No bookings yet
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-6 rounded-xl bg-neutral-50 border-2 border-neutral-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">
                          {booking.name}
                        </h4>
                        <p className="text-primary-600 font-semibold">
                          {format(new Date(booking.date), 'EEEE, MMMM d, yyyy', { locale: enUS })} at {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>📧 {booking.email}</p>
                      <p>📱 {booking.phone}</p>
                      {booking.message && (
                        <p className="mt-3 p-3 bg-white rounded-lg">
                          💬 {booking.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

