export function convertTimeToToday(timeDate: Date): Date {
  const hours = timeDate.getHours();
  const minutes = timeDate.getMinutes();
  const seconds = timeDate.getSeconds();
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(seconds);
  return now;
}

export function mapTimeToToday(hours: number, minutes: number) {
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
}
