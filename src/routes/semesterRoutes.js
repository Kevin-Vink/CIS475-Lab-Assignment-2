const router = require('express').Router();
const {getConnection} = require("../helpers/mysqlHelper");

const connection = getConnection();

/**
 * Get all semesters
 */
router.get('/', async (req, res) => {
    connection.query('SELECT code FROM SEMESTER', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving courses from database');
        } else {
            res.status(200).json(results);
        }

    })
});

/**
 * Get all semesters courses
 */
router.get('/:id/courses', async (req, res) => {
    connection.query('SELECT C.code, C.credit_hours, C.name, C.semester_code, F.firstname FROM COURSE C JOIN FACULTY F ON C.tutor_id = F.bunet_id WHERE semester_code = ?', [req.params.id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving courses from database');
        } else {
            res.status(200).json(results);
        }

    })
});

module.exports = router;