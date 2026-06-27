export const classNames = (
  ...classes: Array<string | false | undefined | null>
): string =>
  classes.filter(Boolean).join(" ");