import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { StudentLoginComponent } from "./student-login.component"

describe("StudentLoginComponent", () => {
  let component: StudentLoginComponent
  let fixture: ComponentFixture<StudentLoginComponent>
  let routerMock: jasmine.SpyObj<Router>

  beforeEach(async () => {
    // Create a spy for the Router
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"])

    await TestBed.configureTestingModule({
      imports: [StudentLoginComponent, FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents()

    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>

    fixture = TestBed.createComponent(StudentLoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should set error when submitting with empty student ID", () => {
    // Arrange
    component.studentId = ""

    // Act
    component.onSubmit()

    // Assert
    expect(component.error()).toEqual("Please enter a student ID")
    expect(routerMock.navigate).not.toHaveBeenCalled()
  })

  it("should navigate to schedule page with valid student ID", () => {
    // Arrange
    component.studentId = "12345"

    // Act
    component.onSubmit()

    // Assert
    expect(component.error()).toBeNull()
    expect(routerMock.navigate).toHaveBeenCalledWith(["/schedule", "12345"])
  })

  it("should have the submit button disabled when student ID is empty", () => {
    // Arrange
    component.studentId = ""
    fixture.detectChanges()

    // Act
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]')

    // Assert
    expect(submitButton.disabled).toBeTrue()
  })

  it("should have the submit button enabled when student ID is provided", () => {
    // Arrange
    component.studentId = "12345"
    fixture.detectChanges()

    // Act
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]')

    // Assert
    expect(submitButton.disabled).toBeFalse()
  })
})
