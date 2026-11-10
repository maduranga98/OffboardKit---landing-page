/** Parses post dates such as "Jun 30, 2026" as UTC midnight so output never depends on the build machine's timezone. */
export function toIsoDate(date: string): string {
  const parsed = new Date(`${date} UTC`);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid post date: ${date}`);
  return parsed.toISOString();
}
