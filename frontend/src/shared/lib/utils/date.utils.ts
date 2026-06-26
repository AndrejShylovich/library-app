const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export const formatDate = (date: Date) =>
  dateFormatter.format(new Date(date));