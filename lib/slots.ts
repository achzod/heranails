export const SESSION_MINUTES = 90

// 09:00 -> 21:00 in 90-minute blocks (last slot ends at 21:00)
export const DEFAULT_SLOT_TIMES = [
  '09:00',
  '10:30',
  '12:00',
  '13:30',
  '15:00',
  '16:30',
  '18:00',
  '19:30',
] as const

export type SlotTime = (typeof DEFAULT_SLOT_TIMES)[number]

export function isValidSlotTime(time: string): time is SlotTime {
  return (DEFAULT_SLOT_TIMES as readonly string[]).includes(time)
}




