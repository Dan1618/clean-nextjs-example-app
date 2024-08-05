import { ICalendarEvent } from "../components/calendarEvents/calendarEvent.entity";
import { EventsResponse } from "./graphql.repository";

export interface IRepository {
    searchCalendarByTitle(title: string, dateValue: string): EventsResponse;
    getCalendarViewByDate(date: string): EventsResponse;

    checkCalendarEventExists(eventName: string): Promise<{ data: { itemExists: {exists: false;} } }>;
    addCalendarEvent(data: ICalendarEvent): Promise<{ data: { addEvent: ICalendarEvent[] } }>;
    editCalendarEvent(data: ICalendarEvent): Promise<{ data: { editEvent: ICalendarEvent[] } }>;
    deleteCalendarEvent(id: string, currentDate: string): Promise<{ data: { deleteEvent: ICalendarEvent[] } }>;
}