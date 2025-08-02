const POOL = require('pg').Pool;

const pool = new POOL({
    user: 'me',
    host: 'localhost',
    database: 'favelinks',
    password: 'password',
    port: 5432
});

const createLink = (request, response) => {
    const name = request.body.name;
    const URL = request.body.URL;

    pool.query(
        'INSERT INTO links(name, URL) VALUES ($1, $2) RETURNING id',
        [name, URL],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`Link added with ID: ${results.rows[0].id}`);
        }
    );
};

// Get all the data from db
const getLinks = (request, response) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    });
};

module.exports = {
    getLinks,
    createLink,
};
