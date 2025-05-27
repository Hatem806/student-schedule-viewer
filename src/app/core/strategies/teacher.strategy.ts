import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Teacher } from "../services/teachers.service";
import { ITeacherStrategy } from "./teacher-strategy.interface";

@Injectable({
  providedIn: "root",
})
export class TeacherStrategy implements ITeacherStrategy {
  getTeachers(): Observable<Teacher[]> {
    // In a real application, this would make an HTTP call
    // return this.http.get<Teacher[]>('/api/teachers');

    // For demonstration, we should return different data
    return of([
      { id: "1", name: "Dr. Anderson", subject: "Computer Science" },
      { id: "2", name: "Prof. Martinez", subject: "Chemistry" },
      { id: "3", name: "Dr. Lee", subject: "Biology" },
    ]);
  }
}
