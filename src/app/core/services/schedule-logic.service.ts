import { Injectable } from '@angular/core';
import { type WeeklySchedule, type ClassSchedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleLogicService {

  constructor() { }

  public updateCurrentOrNextClass(schedule: WeeklySchedule | null): { currentOrNextClass: ClassSchedule | null; isCurrentClass: boolean } {
    if (!schedule) {
      return { currentOrNextClass: null, isCurrentClass: false };
    }

    const currentDay = this.getCurrentDay();
    const currentMinutes = this.getCurrentMinutes();

    const timeToMinutes = (time: string): number => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    // First, check if there's a class currently in session
    const currentClass = schedule.classes.find(
      (cls) =>
        cls.day === currentDay &&
        timeToMinutes(cls.startTime) <= currentMinutes &&
        timeToMinutes(cls.endTime) > currentMinutes
    );

    if (currentClass) {
      return { currentOrNextClass: currentClass, isCurrentClass: true };
    }

    // If no current class, find the next class today
    const todayClasses = schedule.classes
      .filter(
        (cls) =>
          cls.day === currentDay &&
          timeToMinutes(cls.startTime) > currentMinutes
      )
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    if (todayClasses.length > 0) {
      return { currentOrNextClass: todayClasses[0], isCurrentClass: false };
    }

    // If no more classes today, find the next class in the coming days
    const daysOrder = Object.values([
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ]);
    const currentDayIndex = daysOrder.indexOf(currentDay);

    for (let i = 1; i < daysOrder.length; i++) {
      const nextDayIndex = (currentDayIndex + i) % daysOrder.length;
      const nextDay = daysOrder[nextDayIndex];

      const nextDayClasses = schedule.classes
        .filter((cls) => cls.day === nextDay)
        .sort(
          (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
        );

      if (nextDayClasses.length > 0) {
        return { currentOrNextClass: nextDayClasses[0], isCurrentClass: false };
      }
    }

    return { currentOrNextClass: null, isCurrentClass: false };
  }

  private getCurrentDay(): string {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[new Date().getDay()];
  }

  private getCurrentMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }
}
