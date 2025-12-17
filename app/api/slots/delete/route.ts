import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const slotsFile = path.join(process.cwd(), 'data', 'slots.json')

export async function POST(request: NextRequest) {
  try {
    const { slotId } = await request.json()
    
    const slotsData = JSON.parse(fs.readFileSync(slotsFile, 'utf-8'))
    const updatedSlots = slotsData.filter((slot: any) => slot.id !== slotId)
    
    fs.writeFileSync(slotsFile, JSON.stringify(updatedSlots, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting slot' }, { status: 500 })
  }
}



