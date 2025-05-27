import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet } from "@angular/router"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto">
          <h1 class="text-2xl font-bold">Student Schedule Viewer</h1>
        </div>
      </header>
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
