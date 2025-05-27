import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreFacade } from '../../core/facades/explore.facade';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-6">School Information</h2>
      
      @if (exploreFacade.loading()) {
        <div class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }

      @if (exploreFacade.error()) {
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ exploreFacade.error() }}
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Teachers Section -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-xl font-semibold mb-4 text-blue-600">Teachers</h3>
          <ul class="space-y-3">
            @for (teacher of exploreFacade.teachers(); track teacher.id) {
              <li class="border-b pb-2">
                <div class="font-medium">{{ teacher.name }}</div>
                <div class="text-gray-600">{{ teacher.subject }}</div>
              </li>
            }
          </ul>
        </div>

        <!-- Honor Students Section -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-xl font-semibold mb-4 text-green-600">Honor Students</h3>
          <ul class="space-y-3">
            @for (student of exploreFacade.honorStudents(); track student.id) {
              <li class="border-b pb-2">
                <div class="font-medium">{{ student.name }}</div>
                <div class="text-gray-600">{{ student.grade }} - {{ student.achievement }}</div>
              </li>
            }
          </ul>
        </div>

        <!-- Announcements Section -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-xl font-semibold mb-4 text-purple-600">Announcements</h3>
          <ul class="space-y-4">
            @for (announcement of exploreFacade.announcements(); track announcement.id) {
              <li class="border-b pb-3">
                <div class="font-medium">{{ announcement.title }}</div>
                <div class="text-sm text-gray-500 mb-1">{{ announcement.date }}</div>
                <div class="text-gray-600">{{ announcement.content }}</div>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class ExploreComponent {
  exploreFacade = inject(ExploreFacade);
} 