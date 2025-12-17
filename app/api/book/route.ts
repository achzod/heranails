import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getDataDir, ensureJsonFile } from '@/lib/storage'
import { isValidSlotTime } from '@/lib/slots'

const dataDir = getDataDir()
const bookingsFile = path.join(dataDir, 'bookings.json')
const slotsFile = path.join(dataDir, 'slots.json')
ensureJsonFile(bookingsFile, [])
ensureJsonFile(slotsFile, [])

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()
    if (!bookingData?.date || !bookingData?.time || !isValidSlotTime(String(bookingData.time))) {
      return NextResponse.json({ error: 'Invalid date/time' }, { status: 400 })
    }
    
    // Marquer le créneau comme non disponible
    const slotsData = JSON.parse(fs.readFileSync(slotsFile, 'utf-8')) as Array<any>
    const idx = slotsData.findIndex((s: any) => s.date === bookingData.date && s.time === bookingData.time)
    if (idx >= 0) {
      if (slotsData[idx].available === false) {
        return NextResponse.json({ error: 'Slot already booked' }, { status: 409 })
      }
      slotsData[idx] = { ...slotsData[idx], available: false }
    } else {
      slotsData.push({ id: `${bookingData.date}-${bookingData.time}`, date: bookingData.date, time: bookingData.time, available: false })
    }
    fs.writeFileSync(slotsFile, JSON.stringify(slotsData, null, 2))
    
    // Enregistrer la réservation
    const bookingsData = JSON.parse(fs.readFileSync(bookingsFile, 'utf-8'))
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      createdAt: new Date().toISOString()
    }
    bookingsData.push(newBooking)
    fs.writeFileSync(bookingsFile, JSON.stringify(bookingsData, null, 2))
    
    return NextResponse.json({ success: true, booking: newBooking })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 })
  }
}

