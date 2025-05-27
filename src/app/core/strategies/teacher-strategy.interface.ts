import { Observable } from "rxjs";
import { Teacher } from "../services/teachers.service";

export interface ITeacherStrategy {
  getTeachers(): Observable<Teacher[]>;
}
