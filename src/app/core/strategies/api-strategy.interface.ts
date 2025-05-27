import type { Observable } from "rxjs"
import type { ScheduleRequest, ScheduleResponse } from "../models/schedule.model"

export interface ApiStrategy {
  getStudentSchedule(request: ScheduleRequest): Observable<ScheduleResponse>
}
