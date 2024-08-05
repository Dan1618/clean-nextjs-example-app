import { Fragment } from "react";

export const HourGridComponent = () => {
    const HOURS = [
      "12AM",
      "1AM",
      "2AM",
      "3AM",
      "4AM",
      "5AM",
      "6AM",
      "7AM",
      "8AM",
      "9AM",
      "10AM",
      "11AM",
      "12PM",
      "13PM",
      "14PM",
      "15PM",
      "16PM",
      "17PM",
      "18PM",
      "19PM",
      "20PM",
      "21PM",
      "22PM",
      "23PM",
    ];
    return (
      <div
        className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200"
        style={{ gridTemplateRows: "repeat(48, 30px)" }}
      >
        {HOURS.map((hour) => (
          <Fragment key={hour}>
            <div className="left-0 -ml-14 w-14 pr-2 text-right text-xs text-gray-400">
              {hour}
            </div>
            <div />
          </Fragment>
        ))}
      </div>
    );
  };