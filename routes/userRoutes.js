const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', verifyToken, updateUser);
router.get('/verifytoken', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
