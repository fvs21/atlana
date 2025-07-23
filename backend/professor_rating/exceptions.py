from backend.exceptions import DefaultException

class CourseNotFoundException(DefaultException):
    code = "course_not_found"

    def __init__(self, detail="Course not found", status_code=404):
        super().__init__(detail, status_code, self.code)