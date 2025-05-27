import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

interface HonorStudentsStrategy {
  getHonorStudents(): Observable<any>;
}

export interface HonorStudent {
  id: string;
  name: string;
  grade: string;
  achievement: string;
}

@Injectable({
  providedIn: "root",
})
export class HonorStudentsService implements HonorStudentsStrategy {
  getHonorStudents(): Observable<HonorStudent[]> {
    return of([
      {
        id: "1",
        name: "Alice Brown",
        grade: "12th",
        achievement: "Perfect GPA",
      },
      {
        id: "2",
        name: "Bob Wilson",
        grade: "11th",
        achievement: "Science Olympiad Winner",
      },
      {
        id: "3",
        name: "Carol Davis",
        grade: "12th",
        achievement: "National Math Champion",
      },
    ]);
  }
}
