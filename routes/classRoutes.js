const router = require('express').Router()
const classController = require('../controllers/classController')

router.get('/', classController.get_students);
router.get('/:id', classController.get_student);
router.post('/', classController.create_student);
router.put('/:id', classController.update_student);
router.delete('/:id', classController.delete_student);

module.exports = router