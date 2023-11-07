function mapResultToStudentObject(result) {
    return {
        firstname: result.firstname,
        lastname: result.lastname,
        department: result.department_code,
        semester: result.last_enrolled_semester,
        courses: result.courses?.length > 0 ? result.courses.map((course) => {
            return {
                code: course.code,
                semester: course.semester_code,
                name: course.name,
                creditHours: course.credit_hours,
                professor: {
                    firstname: course.firstname,
                    lastname: course.lastname,
                    office: course.office,
                    email: course.email,
                }
            }
        }) : []
    }
}

module.exports = {
    mapResultToStudentObject
}