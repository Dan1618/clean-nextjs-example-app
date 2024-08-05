import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { HourGridComponent } from "./hourGrid/hourGrid.component";
import { CalendarEventsComponent } from "./calendarEvents/calendarEvents.component";
import { fetchCalendarEventData, nextCalendarView, prevCalendarView, searchCalendarEvent } from "./calendarView.controller";
import { EventModalComponent } from "./eventModal/eventModal.component";
import { RepositoryContext } from "../repository/repositoryContext";
import { TCalendarView } from "./calendarView.interface";
import { ICalendarEvent } from "./calendarEvents/calendarEvent.entity";

export const CalendarViewComponent: FunctionComponent<CalendarViewProps> = () => {
  const { repository } = useContext(RepositoryContext);
  const [calendarData, refreshCalendarData] = useState<TCalendarView | null>(null);

  const [eventDialog, setEventDialog] =
    useState<{ isOpen: boolean, eventDialogData?: ICalendarEvent }>({ isOpen: false });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchCalendarEventData(repository, refreshCalendarData, '2025-05-06');
  }, []);

  if (!calendarData?.events) return <div>Loading...</div>;

  return (
    <div className="flex flex-col m-4 sm:m-16 mb-8 content-center">
      <div className="flex mb-8">
        <div>
          <button onClick={() => { setEventDialog({ isOpen: true }) }} className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            + add event
          </button>
        </div>

        <div className="grow h-14 text-center">
          <button onClick={() => prevCalendarView(
            repository, refreshCalendarData, { currentDate: calendarData.currentDate }
          )}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Previous Day
          </button>
          <span className="ml-4 mr-4 text-xl font-bold">{calendarData.currentDate}</span>
          <button onClick={() => nextCalendarView(
            repository, refreshCalendarData, { currentDate: calendarData.currentDate }
          )}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Next day
          </button>
        </div>

        <div className="flex">
          <input type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search..." id="name" name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button
            onClick={() => searchCalendarEvent(
              repository, refreshCalendarData, { searched: searchValue, dateValue: calendarData.currentDate }
            )}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-auto bg-white">
        <div className="w-14 flex-none bg-white border-r ring-gray-100" />
        <div className="grid w-full grid-cols-1 grid-rows-1 h-1440">
          <HourGridComponent />
          <CalendarEventsComponent
            onCalendarEventClick={(eventData) => setEventDialog({ isOpen: true, eventDialogData: eventData })}
            calendarData={calendarData.events}
          ></CalendarEventsComponent>
        </div>
      </div>

      {eventDialog.isOpen ? (
        <EventModalComponent
          refreshCalendarData={refreshCalendarData}
          currentDate={calendarData.currentDate}
          eventDialogData={eventDialog.eventDialogData}
          setEventDialog={setEventDialog}
        />
      ) : null}
    </div>
  );
};

type CalendarViewProps = {};