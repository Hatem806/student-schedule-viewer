import { Injectable, signal, inject } from "@angular/core";
import {
  type ScheduleRequest,
  type ScheduleResponse,
  type WeeklySchedule,
  type ClassSchedule,
} from "../models/schedule.model";
import { ScheduleLogicService } from "../services/schedule-logic.service";
import {
  ScheduleService,
  ScheduleStrategy,
} from "../services/schedule.service";

@Injectable({
  providedIn: "root",
})
export class ScheduleFacade {
  private strategy: ScheduleStrategy;

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

  private scheduleLogicService = inject(ScheduleLogicService);

  constructor() {
    this.strategy = inject(ScheduleService);
  }

  public fetchStudentSchedule(studentId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    const request: ScheduleRequest = { studentId };

    this.strategy.getStudentSchedule(request).subscribe({
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
    const result = this.scheduleLogicService.updateCurrentOrNextClass(schedule);
    this.currentOrNextClassSignal.set(result.currentOrNextClass);
    this.isCurrentClassSignal.set(result.isCurrentClass);
  }

  // Method to change strategy at runtime if needed
  setStrategy(strategy: ScheduleStrategy): void {
    this.strategy = strategy;
  }
}
