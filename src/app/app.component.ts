import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet, RouterLink } from "@angular/router"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">Student Schedule Viewer</h1>
          <button 
            routerLink="/explore"
            class="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            Explore
          </button>
        </div>
      </header>
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
