import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ScheduleFacade } from "./schedule.facade";
import { MockApiStrategy } from "../strategies/mock-api.strategy";

describe("ScheduleFacade", () => {
  let facade: ScheduleFacade;
  let mockApiStrategyMock: jasmine.SpyObj<MockApiStrategy>;

  beforeEach(() => {
    // Create a spy for the MockApiStrategy
    const spy = jasmine.createSpyObj("MockApiStrategy", ["getStudentSchedule"]);

    TestBed.configureTestingModule({
      providers: [ScheduleFacade, { provide: MockApiStrategy, useValue: spy }],
    });

    facade = TestBed.inject(ScheduleFacade);
    mockApiStrategyMock = TestBed.inject(
      MockApiStrategy
    ) as jasmine.SpyObj<MockApiStrategy>;
  });

  it("should be created", () => {
    expect(facade).toBeTruthy();
  });

  describe("fetchStudentSchedule", () => {
    it("should set loading to true when fetching", () => {
      // Arrange
      mockApiStrategyMock.getStudentSchedule.and.returnValue(
        of({
          success: true,
          data: { studentId: "12345", classes: [] },
        })
      );

      // Act
      facade.fetchStudentSchedule("12345");

      // Assert - loading should be true initially
      expect(facade.loading()).toBeTrue();
    });

    it("should update schedule signal on successful response", (done) => {
      // Arrange
      const mockSchedule = {
        studentId: "12345",
        classes: [
          {
            id: "101",
            name: "Test Class",
            day: "MONDAY",
            startTime: "09:00",
            endTime: "10:30",
            room: "TEST-101",
            professor: "Dr. Test",
          },
        ],
      };

      mockApiStrategyMock.getStudentSchedule.and.returnValue(
        of({
          success: true,
          data: mockSchedule,
        })
      );

      // Act
      facade.fetchStudentSchedule("12345");

      // Assert - use setTimeout to wait for the observable to complete
      setTimeout(() => {
        expect(facade.schedule()).toEqual(mockSchedule);
        expect(facade.loading()).toBeFalse();
        expect(facade.error()).toBeNull();
        done();
      });
    });

    it("should set error signal on failed response", (done) => {
      // Arrange
      const errorMessage = "Student not found";
      mockApiStrategyMock.getStudentSchedule.and.returnValue(
        of({
          success: false,
          data: { studentId: "99999", classes: [] },
          message: errorMessage,
        })
      );

      // Act
      facade.fetchStudentSchedule("99999");

      // Assert
      setTimeout(() => {
        expect(facade.schedule()).toBeNull();
        expect(facade.loading()).toBeFalse();
        expect(facade.error()).toEqual(errorMessage);
        done();
      });
    });
  });

  describe("updateCurrentOrNextClass", () => {
    it("should set currentOrNextClass to null when schedule is null", () => {
      // Act
      facade.updateCurrentOrNextClass();

      // Assert
      expect(facade.currentOrNextClass()).toBeNull();
      expect(facade.isCurrentClass()).toBeFalse();
    });

    it("should identify current class correctly", () => {
      // Arrange - Mock the current date/time
      const mockDate = new Date("2023-05-23T09:30:00"); // Monday 9:30 AM
      jasmine.clock().mockDate(mockDate);

      // Set up a schedule with a class that should be current at the mock time
      const mockSchedule = {
        studentId: "12345",
        classes: [
          {
            id: "101",
            name: "Current Class",
            day: "MONDAY",
            startTime: "09:00",
            endTime: "10:30",
            room: "TEST-101",
            professor: "Dr. Current",
          },
          {
            id: "102",
            name: "Later Class",
            day: "MONDAY",
            startTime: "11:00",
            endTime: "12:30",
            room: "TEST-102",
            professor: "Dr. Later",
          },
        ],
      };

      // Set the schedule signal directly for testing
      (facade as any).scheduleSignal.set(mockSchedule);

      // Act
      facade.updateCurrentOrNextClass();

      // Assert
      expect(facade.currentOrNextClass()).toBeTruthy();
      expect(facade.currentOrNextClass()?.id).toEqual("101");
      expect(facade.isCurrentClass()).toBeTrue();
    });

    it("should identify next class correctly when no current class", () => {
      // Arrange - Mock the current date/time
      const mockDate = new Date("2023-05-23T10:45:00"); // Monday 10:45 AM (between classes)
      jasmine.clock().mockDate(mockDate);

      // Set up a schedule with a class that should be next at the mock time
      const mockSchedule = {
        studentId: "12345",
        classes: [
          {
            id: "101",
            name: "Earlier Class",
            day: "MONDAY",
            startTime: "09:00",
            endTime: "10:30",
            room: "TEST-101",
            professor: "Dr. Earlier",
          },
          {
            id: "102",
            name: "Next Class",
            day: "MONDAY",
            startTime: "11:00",
            endTime: "12:30",
            room: "TEST-102",
            professor: "Dr. Next",
          },
        ],
      };

      // Set the schedule signal directly for testing
      (facade as any).scheduleSignal.set(mockSchedule);

      // Act
      facade.updateCurrentOrNextClass();

      // Assert
      expect(facade.currentOrNextClass()).toBeTruthy();
      expect(facade.currentOrNextClass()?.id).toEqual("102");
      expect(facade.isCurrentClass()).toBeFalse();
    });

    it("should find next class on a different day when no more classes today", () => {
      // Arrange - Mock the current date/time
      const mockDate = new Date("2023-05-23T17:00:00"); // Monday 5:00 PM (after all classes)
      jasmine.clock().mockDate(mockDate);

      // Set up a schedule with classes on different days
      const mockSchedule = {
        studentId: "12345",
        classes: [
          {
            id: "101",
            name: "Monday Class",
            day: "MONDAY",
            startTime: "09:00",
            endTime: "10:30",
            room: "TEST-101",
            professor: "Dr. Monday",
          },
          {
            id: "102",
            name: "Tuesday Class",
            day: "TUESDAY",
            startTime: "11:00",
            endTime: "12:30",
            room: "TEST-102",
            professor: "Dr. Tuesday",
          },
        ],
      };

      // Set the schedule signal directly for testing
      (facade as any).scheduleSignal.set(mockSchedule);

      // Act
      facade.updateCurrentOrNextClass();

      // Assert
      expect(facade.currentOrNextClass()).toBeTruthy();
      expect(facade.currentOrNextClass()?.id).toEqual("102");
      expect(facade.isCurrentClass()).toBeFalse();
    });
  });
});
