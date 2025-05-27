import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

interface AnnouncementsStrategy {
  getAnnouncements(): Observable<any>;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
}

@Injectable({
  providedIn: "root",
})
export class AnnouncementsService implements AnnouncementsStrategy {
  getAnnouncements(): Observable<Announcement[]> {
    return of([
      {
        id: "1",
        title: "School Holiday",
        date: "2024-03-15",
        content: "School will be closed for spring break from March 15-22",
      },
      {
        id: "2",
        title: "Science Fair",
        date: "2024-03-20",
        content: "Annual science fair will be held in the main auditorium",
      },
      {
        id: "3",
        title: "Parent-Teacher Meeting",
        date: "2024-03-25",
        content:
          "Scheduled for next week, please check your emails for time slots",
      },
    ]);
  }
}
