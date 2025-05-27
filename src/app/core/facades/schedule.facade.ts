import { Injectable, signal, inject } from "@angular/core";
import type { ApiStrategy } from "../strategies/api-strategy.interface";
import { MockApiStrategy } from "../strategies/mock-api.strategy";
import {
  type ScheduleRequest,
  type ScheduleResponse,
  type WeeklySchedule,
  type ClassSchedule,
} from "../models/schedule.model";

@Injectable({
  providedIn: "root",
})
export class ScheduleFacade {
  private apiStrategy: ApiStrategy;

  private scheduleSignal = signal<WeeklySchedule | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private currentOrNextClassSignal = signal<ClassSchedule | null>(null);
  private isCurrentClassSignal = signal<boolean>(false);

  public readonly schedule = this.scheduleSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly error = this.errorSignal.asReadonly();
  public readonly currentOrNextClass =
    this.currentOrNextClassSignal.asReadonly();
  public readonly isCurrentClass = this.isCurrentClassSignal.asReadonly();

  private mockApiStrategy = inject(MockApiStrategy);

  constructor() {
    this.apiStrategy = this.mockApiStrategy;
  }

  public fetchStudentSchedule(studentId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    const request: ScheduleRequest = { studentId };

    this.apiStrategy.getStudentSchedule(request).subscribe({
      next: (response: ScheduleResponse) => {
        if (response.success) {
          this.scheduleSignal.set(response.data);
          this.updateCurrentOrNextClass();
        }
        this.loadingSignal.set(false);
      },
      error: (res: any) => {
        this.errorSignal.set("An error occurred while fetching the schedule");
        this.scheduleSignal.set(null);
        this.loadingSignal.set(false);
      },
    });
  }

  public updateCurrentOrNextClass(): void {
    const schedule = this.scheduleSignal();
    if (!schedule) {
      this.currentOrNextClassSignal.set(null);
      this.isCurrentClassSignal.set(false);
      return;
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
      this.currentOrNextClassSignal.set(currentClass);
      this.isCurrentClassSignal.set(true);
      return;
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
      this.currentOrNextClassSignal.set(todayClasses[0]);
      this.isCurrentClassSignal.set(false);
      return;
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
        this.currentOrNextClassSignal.set(nextDayClasses[0]);
        this.isCurrentClassSignal.set(false);
        return;
      }
    }

    this.currentOrNextClassSignal.set(null);
    this.isCurrentClassSignal.set(false);
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
