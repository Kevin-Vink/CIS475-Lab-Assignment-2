const router = require('express').Router();
const {getConnection} = require("../helpers/mysqlHelper");
const {mapResultToStudentObject} = require("../mappers/studentMappers");

const connection = getConnection();

/**
 * Get all students
 */
router.get('/', (req, res) => {
    connection.query("SELECT * FROM STUDENT", (err, results) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
});

/**
 * Get student by id
 */
router.get('/:id', (req, res) => {
    connection.query("SELECT S.firstname, S.lastname, S.department_code, S.last_enrolled_semester, C.semester_code, C.name, C.credit_hours, C.code, F.firstname FROM COURSE C JOIN STUDENTCOURSE SC ON C.code = SC.course_id JOIN STUDENT S ON SC.student_code = S.bunet_id JOIN FACULTY F ON C.tutor_id = F.bunet_id WHERE SC.student_code = ?", [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(mapResultToStudentObject(results));
        }
    });
});

/**
 * Add student's course
 */
router.post('/:id/courses/:courseId', async (req, res) => {
    connection.query("SELECT last_enrolled_semester FROM STUDENT WHERE bunet_id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            const semester = results[0].last_enrolled_semester

            connection.query("INSERT INTO STUDENTCOURSE (student_code, course_id, semester_code) VALUES (?, ?, ?)", [req.params.id, req.params.courseId, semester], (err, results) => {
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.status(200).json(results);
                }
            });
        }
    });
});

/**
 * Drop student's course
 */
router.delete('/:id/courses/:courseId', (req, res) => {
    connection.query("DELETE FROM STUDENTCOURSE WHERE student_code = ? AND course_id = ?", [req.params.id, req.params.courseId], (err, results) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
});

/**
 * Create a student
 */
router.post('/', (req, res) => {
   connection.query("INSERT INTO STUDENT (firstname, lastname, email, GPA, department_code, last_enrolled_semester) VALUES (?, ?, ?, ?, ?, ?)", [req.body.firstname, req.body.lastname, req.body.email, req.body.GPA, req.body.department_code, req.body.last_enrolled_semester], (err, results) => {
         if (err) {
              res.status(500).json({error: err});
         } else {
              res.status(200).json(results);
         }
   });
});

/**
 * Update a student
 */
router.put('/:id', (req, res) => {
    connection.query("UPDATE STUDENT SET firstname = ?, lastname = ?, email = ?, GPA = ?, department_code = ?, last_enrolled_semester = ? WHERE bunet_id = ?", [req.body.firstname, req.body.lastname, req.body.email, req.body.GPA, req.body.department_code, req.body.last_enrolled_semester, req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json({student: results});
        }
    });
});

/**
 * Delete a student
 */
router.delete('/:id', (req, res) => {
    connection.query("DELETE FROM STUDENT WHERE bunet_id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json({student: results});
        }
    });
});

module.exports = router;