const router = require('express').Router();
const {getConnection} = require("../helpers/mysqlHelper");

const connection = getConnection();

/**
 * Get all courses
 */
router.get('/', async (req, res) => {
    connection.query('SELECT credit_hours, name, semester_code, code FROM COURSE', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving courses from database');
        } else {
            res.status(200).json(results);
        }

    })
});

module.exports = router;