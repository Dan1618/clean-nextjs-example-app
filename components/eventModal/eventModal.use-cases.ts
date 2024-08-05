import { IRepository } from "../../repository/repository.interface";
import { ICalendarEvent } from "../calendarEvents/calendarEvent.entity";

export async function checkEventExistsUseCase(
  repository: IRepository,
  title: string
): Promise<boolean> {
  if ((await repository.checkCalendarEventExists(title)).data.itemExists.exists) {
    return true;
  }
  return false;
}

export async function addEventUseCase(
  repository: IRepository,
  data: { formData: ICalendarEvent }
): Promise<ICalendarEvent[]> {
  try {
    return (await repository.addCalendarEvent(data.formData)).data.addEvent;
  } catch { }
}

export async function editEventUseCase(
  repository: IRepository,
  data: { formData: ICalendarEvent }
): Promise<ICalendarEvent[]> {
  try {
    return (await repository.editCalendarEvent(data.formData)).data.editEvent
  } catch { }
}

export async function deleteEventUseCase(
  repository: IRepository,
  data: { toDeleteId: string, currentDate: string }
): Promise<ICalendarEvent[]> {
  try {
    return (await repository.deleteCalendarEvent(
      data.toDeleteId, data.currentDate)).data.deleteEvent
  } catch { }
}