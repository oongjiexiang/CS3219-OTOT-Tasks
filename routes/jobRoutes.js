const router = require('express').Router()
const jobController = require('../controllers/jobController')

router.get('/', jobController.get_jobs);
router.get('/:id', jobController.get_job);
router.post('/', jobController.create_job);
router.put('/:id', jobController.update_job);
router.delete('/:id', jobController.delete_job);

module.exports = router