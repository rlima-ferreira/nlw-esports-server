export function convertHourStringToMinutes(time: string): Number {
  const [hour, minutes] = time.split(':').map(Number);
  return minutes + hour * 60;
}

export function convertMinutesToHourString(time: number): String {
  const hours = String(Math.floor(time / 60)).padStart(2, '0');
  const minutes = String(time % 60).padStart(2, '0');
  return `${hours}:${minutes}`;
}
