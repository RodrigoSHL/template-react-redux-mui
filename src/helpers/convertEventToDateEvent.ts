import { parseISO } from "date-fns";

export const convertEventToDateEvent = (dateEvents: any[]) => {
  return dateEvents.map((e): any => {
    e.start = parseISO(e.start);
    e.end = parseISO(e.end);
    return e;
  });
};
