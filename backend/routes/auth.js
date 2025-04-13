const express = require('express');
const router = express.Router();
const upload = require('../middleware/Upload');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser); 

// // Protected route (just for testing JWT)
// router.get('/profile', verifyToken, (req, res) => {
//     res.json({
//       message: 'Token verified. Welcome!',
//       user: req.user,
//     });
//   });

module.exports = router;