import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getDataDir, ensureJsonFile } from '@/lib/storage'
import { isValidSlotTime } from '@/lib/slots'

const slotsFile = path.join(getDataDir(), 'slots.json')
ensureJsonFile(slotsFile, [])

export async function POST(request: NextRequest) {
  try {
    const { date, time, available } = await request.json()
    if (typeof date !== 'string' || typeof time !== 'string' || typeof available !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    if (!isValidSlotTime(time)) {
      return NextResponse.json({ error: 'Invalid slot time' }, { status: 400 })
    }
    
    const slotsData = JSON.parse(fs.readFileSync(slotsFile, 'utf-8')) as Array<any>
    const idx = slotsData.findIndex((s: any) => s.date === date && s.time === time)
    if (idx >= 0) {
      slotsData[idx] = { ...slotsData[idx], available }
    } else {
      slotsData.push({ id: `${date}-${time}`, date, time, available })
    }
    
    fs.writeFileSync(slotsFile, JSON.stringify(slotsData, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error toggling slot' }, { status: 500 })
  }
}

