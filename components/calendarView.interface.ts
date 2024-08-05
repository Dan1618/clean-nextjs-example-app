import { ICalendarEvent } from "./calendarEvents/calendarEvent.entity";

export type TCalendarView = { events: ICalendarEvent[], currentDate: string };