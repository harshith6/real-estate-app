const express = require('express');
const router = express.Router();
const upload = require('../middleware/Upload'); // Multer for image upload

const { createOwner,getAllOwners, getMyOwners, updateOwner, deleteOwner, } = require('../controllers/ownerController');
const authMiddleware = require('../middleware/auth');


// Protected route for creating a property
router.post('/', createOwner);

router.get('/', getAllOwners);

router.get('/my-owners', getMyOwners);

router.put('/:id', updateOwner);
router.delete('/:id', deleteOwner);


module.exports = router;