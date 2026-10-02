const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export const formatDate = (date: Date) => dateFormatter.format(new Date(date));

export function parseDate(value: string): Date {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return date;
}