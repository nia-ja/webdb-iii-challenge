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


// GET all students for the cohort with specified id
// for route /api/cohorts/:id/students
// returns a list of all the students for the particular cohort in the database (or an empty array if there's no students)
router.get('/:id/students', async (req, res) => {
    try {
        const students = await db('students')
            .where('cohorts_id', req.params.id);
        res.status(200).json(students);
      } catch (error) {
        res.status(500).json({
          message: 'Error retrieving students',
          error: error
        });
      }
})

// POST for /api/cohorts
// Returns new cohort object
router.post('/', (req, res) => {
    db('cohorts')
        .insert(req.body, 'id')
        .then(ids => {
            db('cohorts')
                .where({ id: ids[0] })
                .first()
                .then(cohort => {
                    res.status(201).json(cohort);
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Error adding cohort',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error adding cohort',
                error: error
              });
        });
});

// DELETE for /api/cohorts/:id
// Returns number of records has been deleted
router.delete('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'Cohort with specified id doesn\'t exist'});
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting cohort', error: error });
        });
});

// PUT for /api/cohorts/:id
// Returns number of records has been updated
router.put('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if(count > 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'Cohort with specified id doesn\'t exist'});
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error updating cohort', error: error });
        });
});

module.exports = router;