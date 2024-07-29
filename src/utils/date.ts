import { format, intlFormatDistance } from "date-fns";

export const getFormatOrderDate = (date: string): string => `
  ${Date.now() - Date.parse(date) > 1000 * 60 * 60 * 24 * 3 ? format(date, "dd.MM.yyyy") : intlFormatDistance(date, new Date(), { unit: "day" })}, ${format(date, "HH:mm")}
`;
