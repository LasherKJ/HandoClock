export function getTimeForTimezone(timeZone: string, locale: "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());
}
