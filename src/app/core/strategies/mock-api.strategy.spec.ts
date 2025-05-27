import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { MockApiStrategy } from "./mock-api.strategy"
import { firstValueFrom } from "rxjs"

describe("MockApiStrategy", () => {
  let strategy: MockApiStrategy

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockApiStrategy],
    })

    strategy = TestBed.inject(MockApiStrategy)
  })

  it("should be created", () => {
    expect(strategy).toBeTruthy()
  })

  it("should return schedule data for valid student ID", async () => {
    // Arrange
    const studentId = "12345"

    // Act
    const response = await firstValueFrom(strategy.getStudentSchedule({ studentId }))

    // Assert
    expect(response.success).toBeTrue()
    expect(response.data.studentId).toEqual(studentId)
    expect(response.data.classes.length).toBeGreaterThan(0)
  })

  it("should return error for invalid student ID", async () => {
    // Arrange
    const studentId = "invalid-id"

    // Act
    const response = await firstValueFrom(strategy.getStudentSchedule({ studentId }))

    // Assert
    expect(response.success).toBeFalse()
    expect(response.data.classes.length).toEqual(0)
    expect(response.message).toEqual("Student not found")
  })

  it("should include all required class properties in the response", async () => {
    // Arrange
    const studentId = "12345"

    // Act
    const response = await firstValueFrom(strategy.getStudentSchedule({ studentId }))

    // Assert
    const firstClass = response.data.classes[0]
    expect(firstClass).toBeDefined()
    expect(firstClass.id).toBeDefined()
    expect(firstClass.name).toBeDefined()
    expect(firstClass.day).toBeDefined()
    expect(firstClass.startTime).toBeDefined()
    expect(firstClass.endTime).toBeDefined()
    expect(firstClass.room).toBeDefined()
    expect(firstClass.professor).toBeDefined()
  })
})
