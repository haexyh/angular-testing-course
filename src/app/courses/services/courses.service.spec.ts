import {CoursesService} from "./courses.service";
import {TestBed, tick} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {COURSES, LESSONS} from "../../../../server/db-data";
import {Course} from "../model/course";
import {HttpErrorResponse} from "@angular/common/http";

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
    const req = httpTestingController.expectOne({url: '/api/courses', method: 'GET'})
    req.flush({payload: Object.values(COURSES)})
  });

  it('should find a course by id', () => {
    coursesService.findCourseById(12).subscribe(c => {
      expect(c).toBeTruthy();
    })

    const req = httpTestingController.expectOne({method: 'GET', url: '/api/courses/12'})
    req.flush({payload: COURSES[12]})
  });

  it('should save the course data', () => {
    const changes: Partial<Course> = {titles: {description: 'Testing'}}
    coursesService.saveCourse(12, changes)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12);
      })

    const req = httpTestingController.expectOne({url: '/api/courses/12', method: 'PUT'})
    expect(req.request.body.titles.description).toEqual(changes.titles.description);
    req.flush({...COURSES[12], changes})
  });

  it('should throw an error if save course fails', () => {

    const changes: Partial<Course> = {titles: {description: 'Testing'}}
    coursesService.saveCourse(12, changes)
      .subscribe({
        next: _ => fail(), error: (e: HttpErrorResponse) =>
          expect(e.status).toBe(500)
      })

    const req = httpTestingController.expectOne({url: '/api/courses/12', method: 'PUT'})
    expect(req.request.body.titles.description).toEqual(changes.titles.description);
    req.flush('Save course failed', {status: 500, statusText: 'Internal server error'})
  });

  it('should find a list of lessons', () => {
    coursesService.findLessons(12)
      .subscribe(lessons => {
          expect(lessons).toBeTruthy();
          expect(lessons.length).toBe(3)
        }
      )

    const req = httpTestingController.expectOne(req =>
      req.url === '/api/lessons'
    );
    expect(req.request.method).toEqual('GET')
    expect(req.request.params.get("courseId")).toEqual('12')
    expect(req.request.params.get("filter")).toEqual('')
    expect(req.request.params.get("sortOrder")).toEqual('asc')
    expect(req.request.params.get("pageNumber")).toEqual('0')
    expect(req.request.params.get("pageSize")).toEqual('3')

    req.flush({
      payload: [LESSONS["1"], LESSONS["2"], LESSONS["3"]]
    })



  });


  afterEach(() => {
    httpTestingController.verify();
  })
})
