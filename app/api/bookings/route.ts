import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getDataDir, ensureJsonFile } from '@/lib/storage'

const bookingsFile = path.join(getDataDir(), 'bookings.json')
ensureJsonFile(bookingsFile, [])

export async function GET(request: NextRequest) {
  try {
    if (!fs.existsSync(bookingsFile)) {
      return NextResponse.json({ bookings: [] })
    }
    
    const bookingsData = JSON.parse(fs.readFileSync(bookingsFile, 'utf-8'))
    
    // Trier par date décroissante
    const sortedBookings = bookingsData.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    return NextResponse.json({ bookings: sortedBookings })
  } catch (error) {
    return NextResponse.json({ error: 'Error loading bookings' }, { status: 500 })
  }
}

