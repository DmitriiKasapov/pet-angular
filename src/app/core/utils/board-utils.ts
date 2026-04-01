export const HOUR_HEIGHT = 40; // px per hour
export const SNAP_HOURS = 0.5;
export const MIN_DURATION = 0.5;

/** Snaps a hour value to nearest 0.5 increment */
export function snapToGrid(hours: number): number {
  return Math.round(hours / SNAP_HOURS) * SNAP_HOURS;
}

/** Clamps a value between min and max */
export function clampHours(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/** Returns Monday (start of week) for the given date, time set to 00:00:00 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon...
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Adds (or subtracts) days to a date, returns new Date */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Formats a Date to YYYY-MM-DD string using local timezone */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Returns day index 1=Mon ... 7=Sun from a Date */
export function getDayIndex(date: Date): number {
  const day = date.getDay(); // 0=Sun
  return day === 0 ? 7 : day;
}
