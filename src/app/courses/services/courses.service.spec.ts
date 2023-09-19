import {CoursesService} from "./courses.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {COURSES} from "../../../../server/db-data";

describe('CourseService', () => {
  let coursesService: CoursesService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    })
    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should retrieve all courses', () => {

    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).withContext('no courses').toBeTruthy();
      expect(courses.length).withContext('incorrect number of courses').toBe(12)
      expect(courses.find(c => c.id == 12).titles.description).withContext('incorrect title').toBe('Angular Testing Course');
    })
    const req = httpTestingController.expectOne('/api/courses')
    expect(req.request.method).toEqual("GET");
    req.flush({payload: Object.values(COURSES)})

  });
  it('should find  a coourse by id', () => {
    coursesService.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    })

    const req = httpTestingController.expectOne('/api/courses/12')
    expect(req.request.method).toEqual("GET");
    req.flush({payload: COURSES[12]})

  });

  afterEach(() => {
    httpTestingController.verify();

  })

})
