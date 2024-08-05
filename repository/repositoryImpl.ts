import { ICalendarEvent } from "../components/calendarEvents/calendarEvent.entity";
import { EventsResponse } from "./graphql.repository";
import { IRepository } from "./repository.interface";

export class RepositoryImpl implements IRepository {
    dataSource: IRepository;

    constructor(dataSource: IRepository) {
        this.dataSource = dataSource;
    }

    searchCalendarByTitle = (title: string, dateValue: string): EventsResponse => {
        return this.dataSource.searchCalendarByTitle(title, dateValue);
    };

    getCalendarViewByDate = (dateValue: string): EventsResponse => {
        return this.dataSource.getCalendarViewByDate(dateValue);
    };

    checkCalendarEventExists = (title: string): Promise<{ data: { itemExists: { exists: false; } } }> => {
        return this.dataSource.checkCalendarEventExists(title);
    };

    addCalendarEvent = (newEvent: ICalendarEvent): Promise<{ data: { addEvent: ICalendarEvent[] } }> => {
        return this.dataSource.addCalendarEvent(newEvent);
    }

    editCalendarEvent = (editedEvent: ICalendarEvent): Promise<{ data: { editEvent: ICalendarEvent[] } }> => {
        return this.dataSource.editCalendarEvent(editedEvent);
    };

    deleteCalendarEvent = (toDeleteId: string, currentDate: string): Promise<{ data: { deleteEvent: ICalendarEvent[] } }> => {
        return this.dataSource.deleteCalendarEvent(toDeleteId, currentDate);
    };
}