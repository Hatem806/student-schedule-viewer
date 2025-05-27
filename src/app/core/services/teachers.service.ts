import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ITeacherStrategy } from "../strategies/teacher-strategy.interface";
import { TeacherStrategy } from "../strategies/teacher.strategy";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
}

@Injectable({
  providedIn: "root",
})
export class TeachersService {
  private strategy: TeacherStrategy;

  constructor() {
    // In a real application, this could be determined by environment or configuration
    this.strategy = inject(TeacherStrategy);
  }

  // Method to change strategy at runtime if needed
  setStrategy(strategy: ITeacherStrategy): void {
    this.strategy = strategy;
  }

  getTeachers(): Observable<Teacher[]> {
    return this.strategy.getTeachers();
  }
}
