import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ScheduleRequest, ScheduleResponse } from "../models/schedule.model";

export interface ScheduleStrategy {
  getStudentSchedule(request: ScheduleRequest): Observable<ScheduleResponse>;
}

@Injectable({
  providedIn: "root",
})
export class ScheduleService implements ScheduleStrategy {
  // private mockData: Record<string, ScheduleResponse> = {
  //   "12345": {
  //     success: true,
  //     data: {
  //       studentId: "12345",
  //       classes: [
  //         {
  //           id: "101",
  //           name: "Introduction to Computer Science",
  //           day: DayOfWeek.MONDAY,
  //           startTime: "09:00",
  //           endTime: "10:30",
  //           room: "CS-101",
  //           professor: "Dr. Smith",
  //         },
  //         {
  //           id: "102",
  //           name: "Calculus I",
  //           day: DayOfWeek.MONDAY,
  //           startTime: "11:00",
  //           endTime: "12:30",
  //           room: "MATH-201",
  //           professor: "Dr. Johnson",
  //         },
  //         {
  //           id: "103",
  //           name: "Physics 101",
  //           day: DayOfWeek.TUESDAY,
  //           startTime: "09:00",
  //           endTime: "10:30",
  //           room: "PHY-301",
  //           professor: "Dr. Brown",
  //         },
  //         {
  //           id: "104",
  //           name: "English Composition",
  //           day: DayOfWeek.WEDNESDAY,
  //           startTime: "13:00",
  //           endTime: "14:30",
  //           room: "ENG-101",
  //           professor: "Prof. Davis",
  //         },
  //         {
  //           id: "105",
  //           name: "Data Structures",
  //           day: DayOfWeek.THURSDAY,
  //           startTime: "15:00",
  //           endTime: "16:30",
  //           room: "CS-202",
  //           professor: "Dr. Wilson",
  //         },
  //         {
  //           id: "106",
  //           name: "Chemistry Lab",
  //           day: DayOfWeek.FRIDAY,
  //           startTime: "10:00",
  //           endTime: "12:00",
  //           room: "CHEM-101",
  //           professor: "Dr. Taylor",
  //         },
  //       ],
  //     },
  //   },
  //   "67890": {
  //     success: true,
  //     data: {
  //       studentId: "67890",
  //       classes: [
  //         {
  //           id: "201",
  //           name: "Advanced Programming",
  //           day: DayOfWeek.MONDAY,
  //           startTime: "13:00",
  //           endTime: "14:30",
  //           room: "CS-301",
  //           professor: "Dr. Anderson",
  //         },
  //         {
  //           id: "202",
  //           name: "Linear Algebra",
  //           day: DayOfWeek.TUESDAY,
  //           startTime: "11:00",
  //           endTime: "12:30",
  //           room: "MATH-301",
  //           professor: "Dr. White",
  //         },
  //         {
  //           id: "203",
  //           name: "Database Systems",
  //           day: DayOfWeek.WEDNESDAY,
  //           startTime: "09:00",
  //           endTime: "10:30",
  //           room: "CS-401",
  //           professor: "Dr. Garcia",
  //         },
  //         {
  //           id: "204",
  //           name: "Web Development",
  //           day: DayOfWeek.THURSDAY,
  //           startTime: "13:00",
  //           endTime: "14:30",
  //           room: "CS-302",
  //           professor: "Prof. Martinez",
  //         },
  //         {
  //           id: "205",
  //           name: "Software Engineering",
  //           day: DayOfWeek.FRIDAY,
  //           startTime: "15:00",
  //           endTime: "16:30",
  //           room: "CS-501",
  //           professor: "Dr. Robinson",
  //         },
  //       ],
  //     },
  //   },
  // };
  private readonly url: string =
    "https://9d3001b4-e346-408a-bf9c-226634a3cd99.mock.pstmn.io";

  constructor(private http: HttpClient) {}

  getStudentSchedule(request: ScheduleRequest): Observable<ScheduleResponse> {
    return this.http.post<ScheduleResponse>(
      `${this.url}/api/schedule`,
      request
    );

    // Simulate network delay
    // if (this.mockData[request.studentId]) {
    //   return of(this.mockData[request.studentId]).pipe(delay(800));
    // } else {
    //   return of({
    //     success: false,
    //     data: { studentId: request.studentId, classes: [] },
    //     message: "Student not found",
    //   }).pipe(delay(800));
    // }
  }
}
