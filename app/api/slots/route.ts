import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getDataDir, ensureJsonFile } from '@/lib/storage'
import { DEFAULT_SLOT_TIMES } from '@/lib/slots'

const slotsFile = path.join(getDataDir(), 'slots.json')
ensureJsonFile(slotsFile, [])

export async function POST(request: NextRequest) {
  try {
    const { date } = await request.json()
    
    const slotsData = JSON.parse(fs.readFileSync(slotsFile, 'utf-8')) as Array<{
      id: string
      date: string
      time: string
      available: boolean
    }>

    const byTime = new Map(
      slotsData.filter((s) => s.date === date).map((s) => [s.time, s] as const)
    )

    // Grille fixe 09:00 -> 19:30 (sessions 1h30, fin 21:00)
    const slots = DEFAULT_SLOT_TIMES.map((time) => {
      const existing = byTime.get(time)
      return (
      existing ?? {
        id: `${date}-${time}`,
        date,
        time,
        available: true,
      }
      )
    })
    
    return NextResponse.json({ slots })
  } catch (error) {
    return NextResponse.json({ error: 'Error loading slots' }, { status: 500 })
  }
}

