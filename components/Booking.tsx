'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function Booking() {
  const [isMounted, setIsMounted] = useState(false)
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[BOOKING DEBUG] Submitting name:', name)
    if (name) {
      setIsSubmitted(true)
    } else {
      alert('Please enter a name')
    }
  }

  if (!isMounted) return <div style={{ padding: '20px' }}>Loading Booking...</div>

  if (isSubmitted) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', background: '#e0ffe0' }}>
        <h2>BOOKING SUCCESS (DEBUG)</h2>
        <p>Thank you, {name}!</p>
        <button onClick={() => setIsSubmitted(false)}>Back</button>
      </div>
    )
  }

  return (
    <div id="booking" style={{ padding: '50px', background: '#f0f0f0' }}>
      <h2>Booking (Debug)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#000', color: '#fff' }}>
          Confirm My Booking
        </button>
      </form>
    </div>
  )
}


