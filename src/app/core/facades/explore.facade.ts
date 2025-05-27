import { Injectable, signal, inject } from "@angular/core";
import { TeachersService, type Teacher } from "../services/teachers.service";
import {
  HonorStudentsService,
  type HonorStudent,
} from "../services/honor-students.service";
import {
  AnnouncementsService,
  type Announcement,
} from "../services/announcements.service";

@Injectable({
  providedIn: "root",
})
export class ExploreFacade {
  private teachersService = inject(TeachersService);
  private honorStudentsService = inject(HonorStudentsService);
  private announcementsService = inject(AnnouncementsService);

  private teachersSignal = signal<Teacher[]>([]);
  private honorStudentsSignal = signal<HonorStudent[]>([]);
  private announcementsSignal = signal<Announcement[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  public readonly teachers = this.teachersSignal.asReadonly();
  public readonly honorStudents = this.honorStudentsSignal.asReadonly();
  public readonly announcements = this.announcementsSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.fetchAllData();
  }

  public fetchAllData(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Fetch teachers
    this.teachersService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachersSignal.set(teachers);
      },
      error: (error) => {
        this.errorSignal.set("Failed to fetch teachers");
      },
    });

    // Fetch honor students
    this.honorStudentsService.getHonorStudents().subscribe({
      next: (students) => {
        this.honorStudentsSignal.set(students);
      },
      error: (error) => {
        this.errorSignal.set("Failed to fetch honor students");
      },
    });

    // Fetch announcements
    this.announcementsService.getAnnouncements().subscribe({
      next: (announcements) => {
        this.announcementsSignal.set(announcements);
      },
      error: (error) => {
        this.errorSignal.set("Failed to fetch announcements");
      },
      complete: () => {
        this.loadingSignal.set(false);
      },
    });
  }
}
