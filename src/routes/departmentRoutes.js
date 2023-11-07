const router = require('express').Router();
const {getConnection} = require("../helpers/mysqlHelper");

const connection = getConnection();

/**
 * Get all departments
 */
router.get('/', async (req, res) => {
    connection.query('SELECT name FROM DEPARTMENT', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving courses from database');
        } else {
            res.status(200).json(results);
        }

    })
});

module.exports = router;