import type { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/student-login/student-login.component").then((m) => m.StudentLoginComponent),
  },
  {
    path: "schedule/:studentId",
    loadComponent: () =>
      import("./features/schedule-viewer/schedule-viewer.component").then((m) => m.ScheduleViewerComponent),
  },
  {
    path: "**",
    redirectTo: "",
  },
]
