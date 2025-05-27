import {
  Component,
  type OnInit,
  type OnDestroy,
  inject,
  DestroyRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ScheduleFacade } from "../../core/facades/schedule.facade";
import type { ClassSchedule } from "../../core/models/schedule.model";

@Component({
  selector: "app-schedule-viewer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Weekly Schedule</h2>
        <button
          (click)="goBack()"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
      </div>

      <div
        *ngIf="scheduleFacade.loading()"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <div
        *ngIf="scheduleFacade.error()"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ scheduleFacade.error() }}
      </div>

      <div
        *ngIf="
          !scheduleFacade.loading() &&
          !scheduleFacade.error() &&
          scheduleFacade.schedule()
        "
      >
        <div class="mb-4 p-4 bg-primary rounded-lg">
          <p class="text-lg">
            <span class="font-semibold">Student ID:</span>
            {{ scheduleFacade.schedule()?.studentId }}
          </p>
          <p *ngIf="scheduleFacade.currentOrNextClass()" class="mt-2">
            <span class="font-semibold">
              {{
                scheduleFacade.isCurrentClass()
                  ? "Current Class:"
                  : "Next Class:"
              }}
            </span>
            <span class="ml-2 text-blue-600 font-medium">
              {{ scheduleFacade.currentOrNextClass()?.name }}
              ({{ scheduleFacade.currentOrNextClass()?.day }},
              {{ scheduleFacade.currentOrNextClass()?.startTime }} -
              {{ scheduleFacade.currentOrNextClass()?.endTime }})
            </span>
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th
                  class="py-3 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
                >
                  Day
                </th>
                <th
                  class="py-3 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
                >
                  Time
                </th>
                <th
                  class="py-3 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
                >
                  Class
                </th>
                <th
                  class="py-3 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
                >
                  Room
                </th>
                <th
                  class="py-3 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
                >
                  Professor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let class of scheduleFacade.schedule()?.classes"
                [ngClass]="{
                  'bg-blue-500': isHighlighted(class),
                }"
                class="hover:bg-gray-300 transition-colors"
              >
                <td class="py-3 px-4 border-b">{{ class.day }}</td>
                <td class="py-3 px-4 border-b">
                  {{ class.startTime }} - {{ class.endTime }}
                </td>
                <td class="py-3 px-4 border-b font-medium">{{ class.name }}</td>
                <td class="py-3 px-4 border-b">{{ class.room }}</td>
                <td class="py-3 px-4 border-b">{{ class.professor }}</td>
              </tr>
              <tr *ngIf="scheduleFacade.schedule()?.classes?.length === 0">
                <td colspan="5" class="py-4 px-4 text-center text-gray-500">
                  No classes scheduled
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ScheduleViewerComponent implements OnInit, OnDestroy {
  private studentId = "";
  private refreshInterval = new Subscription();

  // Inject services
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  destroyRef = inject(DestroyRef);
  public scheduleFacade = inject(ScheduleFacade);

  ngOnInit(): void {
    // Get student ID from route params - still need RxJS for route params
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.studentId = params["studentId"];
        this.loadSchedule();
      });

    // Set up interval to refresh current/next class every minute
    this.refreshInterval = interval(60000).subscribe(() => {
      this.scheduleFacade.updateCurrentOrNextClass();
    });
  }

  ngOnDestroy(): void {
    this.refreshInterval.unsubscribe();
  }

  loadSchedule(): void {
    if (this.studentId) {
      this.scheduleFacade.fetchStudentSchedule(this.studentId);
    }
  }

  isHighlighted(classItem: ClassSchedule): boolean {
    const currentOrNextClass = this.scheduleFacade.currentOrNextClass();
    return (
      currentOrNextClass !== null && classItem.id === currentOrNextClass.id
    );
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
