import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Teacher } from "../services/teachers.service";
import { ITeacherStrategy } from "./teacher-strategy.interface";

@Injectable({
  providedIn: "root",
})
export class ApiTeacherStrategy implements ITeacherStrategy {
  getTeachers(): Observable<Teacher[]> {
    // In a real application, this would make an HTTP call
    // return this.http.get<Teacher[]>('/api/teachers');

    // For demonstration, we should return different data
    return of([
      { id: "4", name: "Dr. Anderson", subject: "Computer Science" },
      { id: "5", name: "Prof. Martinez", subject: "Chemistry" },
      { id: "6", name: "Dr. Lee", subject: "Biology" },
    ]);
  }
}
