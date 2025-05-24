const Owners = require('../models/Owners'); // Import Property model
const path = require('path');
const { Op } = require('sequelize');

// Create Property
exports.createOwner = async (req, res) => {
  try {
    
    // Get property data from the request body
    const { name, location, price, measurment ,face,contact,userId} = req.body;

    // Create new property entry
    const newOwner = await Owners.create({
      name,
      location,
      price,
      measurment,
      face,
      contact, // Store image filenames
      userId // User ID from the auth middleware (JWT)
    });

    // Return success response
    res.status(201).json({
      message: 'Owner has created successfully',
      owner: newOwner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
};

// / Get all owners
exports.getAllOwners = async (req, res) => {
    try {
        
        // const filters = {
        //     location: req.query?.location || req.body?.location || '',
        //     minPrice: req.query?.minPrice || req.body?.minPrice || null,
        //     maxPrice: req.query?.maxPrice || req.body?.maxPrice || null,
        //     title: req.query?.title || req.body?.title || ''
        // };

        // console.log('Received filters:', filters); // Debug log

        // // Build dynamic filter
        const where = {};

        // // Only add title filter if it exists and has content
        // if (filters.title?.trim()) {
        //     where.title = {
        //         [Op.iLike]: `%${filters.title.trim()}%`
        //     };
        // }
        
        // // Only add location filter if it exists and has content
        // if (filters.location?.trim()) {
        //     where.location = { 
        //         [Op.iLike]: `%${filters.location.trim()}%` 
        //     };
        // }

        // // Only add price filters if they exist
        // if (filters.minPrice || filters.maxPrice) {
        //     where.price = {};
        //     if (filters.minPrice) where.price[Op.gte] = parseFloat(filters.minPrice);
        //     if (filters.maxPrice) where.price[Op.lte] = parseFloat(filters.maxPrice);
        // }

        const owners = await Owners.findAll({ 
            where,
            order: [['createdAt', 'DESC']]
        });

        console.log(`Found ${owners.length} owners`);
        
        res.status(200).json({
            success: true,
            count: owners.length,
            owners
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch owners' });
    }
  };


  exports.getMyOwners = async (req, res) => {
    try {
        const userId = req.body?.userId || req.query?.userId  // Get userId from request body
      
        // Validate if userId exists
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
        }
  
        const owner = await Owners.findAll({ 
          where: { userId },
          order: [['createdAt', 'DESC']] // Optional: Sort by newest first
        });
    
        res.status(200).json(owner);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch your Owners' });
    }
  };


  // Update Property
exports.updateOwner = async (req, res) => {
    try {
      const owner = await Owners.findByPk(req.params.id);
  
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }
  
      // Ensure only the owner can update
      if (owner.userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to update this owners' });
      }
  
      const { name, location, price, measurment ,face,contact,userId } = req.body;
  
      await owner.update({
        name: name || owner.name,
        measurment: measurment || owner.measurment,
        price: price || owner.price,
        location: location || owner.location,
        face: face || owner.face,
        contact: contact || owner.contact,
        userId: userId || owner.userId
      });
  
      res.status(200).json({ message: 'Owner updated successfully', owner });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating owner' });
    }
  };

  exports.deleteOwner = async (req, res) => {
    try {
      const owner = await Owners.findByPk(req.params.id);
  
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }
  
      // Ensure only the owner can delete
      if (owner.userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to delete this Owner' });
      }
  
      await owner.destroy();
      res.status(200).json({ message: 'Owner deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting Owner' });
    }
  };

  