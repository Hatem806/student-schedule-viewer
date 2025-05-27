export interface ClassSchedule {
  id: string;
  name: string;
  day: string;
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  room: string;
  professor: string;
}

export interface WeeklySchedule {
  studentId: string;
  classes: ClassSchedule[];
}

export interface ScheduleResponse {
  success: boolean;
  data: WeeklySchedule;
  message?: string;
}

export interface ScheduleRequest {
  studentId: string;
}
