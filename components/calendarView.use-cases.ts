import { IRepository } from "../repository/repository.interface";
import { ICalendarEvent } from "./calendarEvents/calendarEvent.entity";

export async function changeCalendarDateUseCase(
  repository: IRepository,
  data: { followingDate: string }
): Promise<ICalendarEvent[]> {
  try {
    return (await repository.getCalendarViewByDate(data.followingDate)).data.events
  } catch { }
}

export async function searchEventUseCase(
  repository: IRepository,
  data: { searched: string, dateValue: string }
): Promise<ICalendarEvent[]> {
  try {
    return (await repository.searchCalendarByTitle(data.searched, data.dateValue)).data.events
  } catch { }
}