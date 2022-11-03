const router = require('express').Router();
const { studentLogin, resetPassword } = require('../../controllers/student/studentController');

// URL /user/

// POST REQUEST
router.post('/login', studentLogin)

// PUT REQUEST
router.put('/:id', resetPassword)
module.exports = router

