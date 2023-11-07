function mapResultToStudentObject(result) {
    return {
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        department: result[0].department_code,
        semester: result[0].last_enrolled_semester,
        courses: result.map((course) => {
            return {
                code: course.code,
                semester: course.semester_code,
                name: course.name,
                creditHours: course.credit_hours,
                professor: course.firstname
            }
        })
    }
}

module.exports = {
    mapResultToStudentObject
}