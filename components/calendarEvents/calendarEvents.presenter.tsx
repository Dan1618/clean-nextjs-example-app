import { ICalendarEvent } from "./calendarEvent.entity";

// basic mapping function
export const mapGroupedEvents = (events: ICalendarEvent[]): ICalendarEvent[][] => {

  let eventsClone = [...events];
  const groups: ICalendarEvent[][] = [];

  while (eventsClone?.length > 0) {
    const event: ICalendarEvent = eventsClone.shift();
    for (let j = 0; j <= groups.length; j++) {
      if (!groups[j]) {
        groups[j] = [event];
        break;
      } else if (event.start >= groups[j].at(-1).end) {
        groups[j].push(event);
        break;
      }
    }
  }

  return groups;
};
