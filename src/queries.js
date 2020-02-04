const { Pool } = require('pg'); 
const secrets = require('../middleware/ENV').default;

const env = process.env.NODE_ENV || 'development';

let connectionString = {
	    user: secrets.user,
	    database: secrets.testDb,
	    host: secrets.host
};// checking to know the environment and suitable connection string to use

if (env === 'development') {
    connectionString.database = secrets.database;
} else {
    connectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
        };

};

const pool = new Pool(connectionString);

pool.on('connect', () => console.log('connected to db'));


const getAllData = (request, response) => {
	          pool.query('SELECT * FROM summaries ORDER BY id ASC', (error, results) => {
                        if (error) {
                                  throw error
                                 }
                        response.status(200).json(results.rows)
			                      })
}


const createEntry = (request, response) => {
	  const { title, medium, description, points, image} = request.body

	  pool.query('INSERT INTO summaries (title, medium, description, points, image) VALUES ($1, $2, $3, $4, $5)', [title, medium, description, points, image], (error, results) => {
		      if (error) {
			            throw error
			          }
		      response.status(201).send(`Entry added with ID: ${results.insertId}`)
		    })
}

const updateEntry = (request, response) => {
	  const id = parseInt(request.params.id)
	  const { title, medium, description, points, image} = request.body

	  pool.query('UPDATE summaries SET title = $1, medium = $2, description = $3, points = $4, image = $5 WHERE id = $6', [title, medium, description, points, image, id], (error, results) => {
			            if (error) {
					            throw error
					          }
			            response.status(200).send(`Entry modified with ID: ${id}`)
			          }
		    )
}

const deleteEntry = (request, response) => {
	  const id = parseInt(request.params.id)

	  pool.query('DELETE FROM summaries WHERE id = $1', [id], (error, results) => {
		      if (error) {
			            throw error
			          }
		      response.status(200).send(`Entry deleted with ID: ${id}`)
		    })
}

module.exports = {
	  getAllData,
	  createEntry,
	  updateEntry,
	  deleteEntry,
}
