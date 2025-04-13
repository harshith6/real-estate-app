const express = require('express');
const router = express.Router();
const upload = require('../middleware/Upload'); // Multer for image upload
const { createProperty,getAllProperties,getMyProperties,updateProperty,deleteProperty} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/auth');


// Protected route for creating a property
router.post('/', upload.array('images', 5), createProperty);

router.get('/', getAllProperties);

router.get('/my-properties', getMyProperties);

router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);


module.exports = router;