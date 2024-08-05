import { promises as fsPromises } from "fs";
import { ICalendarEvent } from "../components/calendarEvents/calendarEvent.entity";

export class EventService<T> {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  _parsedJSONData = (data) =>
    data.map((item) => {
      if (typeof item === "string") {
        return JSON.parse(item);
      } else {
        return item;
      }
    });

  async removeDataFromFile(idToRemove: string): Promise<void> {
    try {
      const existingData = await this.readDataFromFile() as Array<ICalendarEvent>;

      const updatedData = [...(existingData.filter((el) => el.id !== idToRemove) || [])];
      await fsPromises.writeFile(
        this.filePath,
        JSON.stringify(updatedData, null, 2).replace(/\\n/g, ""),
        "utf-8"
      );

      console.log(`Data saved to ${this.filePath}`);
    } catch (error) {
      console.error(`Error saving data to file: ${error.message}`);
    }
  }

  async editDataToFile(data): Promise<void> {
    try {
      const existingData = await this.readDataFromFile();

      const updatedData = [...(existingData || [])].map((el: any) => {
        if(el.id === data.id) {
          return data;
        };
        return el;
      });

      await fsPromises.writeFile(
        this.filePath,
        JSON.stringify(updatedData, null, 2),
        "utf-8"
      );

      console.log(`Data saved to ${this.filePath}`);
    } catch (error) {
      console.error(`Error saving data to file: ${error.message}`);
    }
  }

  async saveDataToFile(data: T[]): Promise<void> {
    try {
      // const serializedData = JSON.stringify(
      //   { ...data },
      //   null,
      //   2
      // );
      const existingData = await this.readDataFromFile();

      const updatedData = [...(existingData || []), data];
      await fsPromises.writeFile(
        this.filePath,
        JSON.stringify(updatedData, null, 2),
        "utf-8"
      );

      console.log(`Data saved to ${this.filePath}`);
    } catch (error) {
      console.error(`Error saving data to file: ${error.message}`);
    }
  }

  async readDataFromFile(): Promise<T[] | null> {
    try {
      const fileContent = await fsPromises.readFile(this.filePath, "utf-8");
      const sanitizedJsonString = fileContent.replace(/\\n/g, "");
      return this._parsedJSONData(JSON.parse(sanitizedJsonString));
    } catch (error) {
      console.error(`Error reading data from file: ${error.message}`);
      return null;
    }
  }
}
