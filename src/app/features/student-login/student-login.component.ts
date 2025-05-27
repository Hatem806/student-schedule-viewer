import { Component, signal, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
  selector: "app-student-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex justify-center items-center min-h-[80vh]">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Student Schedule Login</h2>
        
        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="studentId" class="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              [(ngModel)]="studentId"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your student ID"
              required
            />
            @if (error()) {
              <p class="mt-2 text-sm text-red-600">{{ error() }}</p>
            }
            <p class="mt-2 text-xs text-gray-500">
              Try with sample IDs: 12345 or 67890
            </p>
          </div>
          
          <button
            type="submit"
            [disabled]="!studentId"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Schedule
          </button>
        </form>
      </div>
    </div>
  `,
})
export class StudentLoginComponent {
  studentId = ""
  error = signal<string | null>(null)
  private router = inject(Router)

  onSubmit(): void {
    if (!this.studentId) {
      this.error.set("Please enter a student ID")
      return
    }

    this.router.navigate(["/schedule", this.studentId])
  }
}
