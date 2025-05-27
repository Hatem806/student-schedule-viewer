import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { ScheduleViewerComponent } from "./schedule-viewer.component";
import { ScheduleFacade } from "../../core/facades/schedule.facade";

describe("ScheduleViewerComponent", () => {
  let component: ScheduleViewerComponent;
  let fixture: ComponentFixture<ScheduleViewerComponent>;
  let scheduleFacadeMock: jasmine.SpyObj<ScheduleFacade>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for the dependencies
    const scheduleFacadeSpy = jasmine.createSpyObj(
      "ScheduleFacade",
      ["fetchStudentSchedule", "updateCurrentOrNextClass"],
      {
        // Mock the signals as getters that return functions
        schedule: jasmine.createSpy("schedule").and.returnValue({
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
        }),
        loading: jasmine.createSpy("loading").and.returnValue(false),
        error: jasmine.createSpy("error").and.returnValue(null),
        currentOrNextClass: jasmine
          .createSpy("currentOrNextClass")
          .and.returnValue({
            id: "101",
            name: "Test Class",
            day: "MONDAY",
            startTime: "09:00",
            endTime: "10:30",
            room: "TEST-101",
            professor: "Dr. Test",
          }),
        isCurrentClass: jasmine
          .createSpy("isCurrentClass")
          .and.returnValue(true),
      }
    );

    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [ScheduleViewerComponent],
      providers: [
        { provide: ScheduleFacade, useValue: scheduleFacadeSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ studentId: "12345" }),
          },
        },
      ],
    }).compileComponents();

    scheduleFacadeMock = TestBed.inject(
      ScheduleFacade
    ) as jasmine.SpyObj<ScheduleFacade>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(ScheduleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch schedule on init with student ID from route", () => {
    expect(scheduleFacadeMock.fetchStudentSchedule).toHaveBeenCalledWith(
      "12345"
    );
  });

  it("should navigate back when goBack is called", () => {
    // Act
    component.goBack();

    // Assert
    expect(routerMock.navigate).toHaveBeenCalledWith(["/"]);
  });

  it("should highlight the current class", () => {
    // Arrange
    const currentClass = {
      id: "101",
      name: "Test Class",
      day: "MONDAY",
      startTime: "09:00",
      endTime: "10:30",
      room: "TEST-101",
      professor: "Dr. Test",
    };

    // Act
    const result = component.isHighlighted(currentClass);

    // Assert
    expect(result).toBeTrue();
  });

  it("should not highlight a different class", () => {
    // Arrange
    const differentClass = {
      id: "102",
      name: "Different Class",
      day: "TUESDAY",
      startTime: "11:00",
      endTime: "12:30",
      room: "TEST-102",
      professor: "Dr. Different",
    };

    // Act
    const result = component.isHighlighted(differentClass);

    // Assert
    expect(result).toBeFalse();
  });
});
