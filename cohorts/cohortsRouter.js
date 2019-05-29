const knex = require('knex');
const router = require ('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex(knexConfig);

// ROUTES

// GET for /api/cohorts
// Returnes a list of all the cohorts in the database
router.get('/', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
      } catch (error) {
        res.status(500).json({
          message: 'Error retrieving cohorts',
          error: error
        });
      }
});

// GET BY ID for /api/cohorts/:id
// Returns cohorts object with specified id
router.get('/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts')
            .where({id: req.params.id })
            .first()
            if(cohort) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: "Cohort with the specified ID does not exist." })
            }
    } catch (error) {
        res.status(500).json({ 
            message: "Cohort information could not be retrieved.",
            error: error 
        });
    }
});

module.exports = router;