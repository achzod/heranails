'use client'

import { useState, useEffect } from 'react'
import { format, addDays, isSameDay } from 'date-fns'
import { enUS } from 'date-fns/locale'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [password, setPassword] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    setIsMounted(true)
    setSelectedDate(new Date())
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[DEBUG] Attempting login with password:', password)
    if (password === 'hera2024') {
      console.log('[DEBUG] Success! Setting auth to true')
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      alert('Incorrect password')
    }
  }

  if (!isMounted || !selectedDate) return <div style={{ padding: '20px' }}>Loading...</div>

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
        <h1>Admin Login (Debug)</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }}
            placeholder="hera2024"
          />
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#000', color: '#fff' }}>
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>ADMIN PANEL UNLOCKED</h1>
      <p>Authenticated: YES</p>
      <button onClick={() => { localStorage.removeItem('admin_auth'); setIsAuthenticated(false); }}>
        Logout
      </button>
      <hr />
      <h3>Selected Date: {format(selectedDate, 'yyyy-MM-dd')}</h3>
      <p>If you see this, interactivity IS working.</p>
    </div>
  )
}


