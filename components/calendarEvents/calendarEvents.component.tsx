import { FunctionComponent } from "react";
import { ICalendarEvent } from "./calendarEvent.entity";
import { mapGroupedEvents } from "./calendarEvents.presenter";

export const CalendarEventsComponent: FunctionComponent<CalendarEventsProps> = (
  props
) => {
  const calendarEventsGrouped: ICalendarEvent[][] = mapGroupedEvents(props.calendarData);

  return (
    <div
      className={`col-start-1 col-end-2 row-start-1 relative grid grid-cols-${calendarEventsGrouped.length} grid-rows-1`}
    >
      {calendarEventsGrouped
        .map((group, groupIndex) =>
          group.map((calendarEvent: ICalendarEvent) => (
            <div
              onClick={() => {props.onCalendarEventClick(calendarEvent)}}
              key={calendarEvent.id}
              className={`grid row-start-1 col-start-${groupIndex + 1} col-end-${groupIndex + 2}`}
              style={{ height: calendarEvent.end - calendarEvent.start, marginTop: calendarEvent.start }}
            >
              <div
                className={`
          rounded-lg
          text-xs
          leading-5
          bg-blue-50
          h-full
          p-1
          border
          font-semibold text-blue-700
          cursor-pointer
        `}
              >
                {calendarEvent.title}
              </div>
            </div>
          ))
        ).flat()}
    </div>


  );
};

type CalendarEventsProps = {
  calendarData: ICalendarEvent[];
  onCalendarEventClick: (eventData: ICalendarEvent) => void;
};