import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const slotsFile = path.join(process.cwd(), 'data', 'slots.json')

export async function POST(request: NextRequest) {
  try {
    const { date, time } = await request.json()
    
    const slotsData = JSON.parse(fs.readFileSync(slotsFile, 'utf-8'))
    
    const newSlot = {
      id: `${date}-${time}-${Date.now()}`,
      date,
      time,
      available: true
    }
    
    slotsData.push(newSlot)
    fs.writeFileSync(slotsFile, JSON.stringify(slotsData, null, 2))
    
    return NextResponse.json({ success: true, slot: newSlot })
  } catch (error) {
    return NextResponse.json({ error: 'Error adding slot' }, { status: 500 })
  }
}



