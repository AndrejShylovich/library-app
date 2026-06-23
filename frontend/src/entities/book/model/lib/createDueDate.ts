const LOAN_PERIOD_DAYS = 14;

export const createDueDate = (): string => {
  const dueDate = new Date();

  dueDate.setDate(dueDate.getDate() + LOAN_PERIOD_DAYS);

  return dueDate.toISOString();
};