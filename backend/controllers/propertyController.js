const Property = require('../models/Property'); // Import Property model
const path = require('path');
const { Op } = require('sequelize');

// Create Property
exports.createProperty = async (req, res) => {
  try {
    // Check if images exist in the request
    const images = req.files ? req.files.map(file => file.filename) : []; // Get the filenames of uploaded images
    
    // Get property data from the request body
    const { title, description, price, location ,userId} = req.body;

    // Create new property entry
    const newProperty = await Property.create({
      title,
      description,
      price,
      location,
      images, // Store image filenames
      userId // User ID from the auth middleware (JWT)
    });

    // Return success response
    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        // const { location, minPrice, maxPrice, title} = req.query;

        // console.log('Received filters:', { location, minPrice, maxPrice,title }); // Debug log

        // // Build dynamic filter
        // const where = {};

        // // if (title) {
        // //     where.title = { [Op.iLike]: `%${title.trim()}%` }; // Case-insensitive title search
        // // }

        // if (title && title.trim()) {
        //     where.title = {
        //         [Op.iLike]: `%${title.trim()}%`
        //     };
        //     console.log('Title filter added:', where.title);
        // }

        // if (location) {
        //     where.location = { [Op.iLike]: `%${location.trim()}%` }; // Case-insensitive partial match
        // }

        // if (minPrice || maxPrice) {
        //     where.price = {};
        //     if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
        //     if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
        // }
        const filters = {
            location: req.query?.location || req.body?.location || '',
            minPrice: req.query?.minPrice || req.body?.minPrice || null,
            maxPrice: req.query?.maxPrice || req.body?.maxPrice || null,
            title: req.query?.title || req.body?.title || ''
        };

        console.log('Received filters:', filters); // Debug log

        // Build dynamic filter
        const where = {};

        // Only add title filter if it exists and has content
        if (filters.title?.trim()) {
            where.title = {
                [Op.iLike]: `%${filters.title.trim()}%`
            };
        }
        
        // Only add location filter if it exists and has content
        if (filters.location?.trim()) {
            where.location = { 
                [Op.iLike]: `%${filters.location.trim()}%` 
            };
        }

        // Only add price filters if they exist
        if (filters.minPrice || filters.maxPrice) {
            where.price = {};
            if (filters.minPrice) where.price[Op.gte] = parseFloat(filters.minPrice);
            if (filters.maxPrice) where.price[Op.lte] = parseFloat(filters.maxPrice);
        }

        const properties = await Property.findAll({ 
            where,
            order: [['createdAt', 'DESC']]
        });

        console.log(`Found ${properties.length} properties`);
        
        res.status(200).json({
            success: true,
            count: properties.length,
            properties
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch properties' });
    }
  };


  exports.getMyProperties = async (req, res) => {
    try {
        const userId = req.body?.userId || req.query?.userId  // Get userId from request body
      
        // Validate if userId exists
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
        }
  
        const properties = await Property.findAll({ 
          where: { userId },
          order: [['createdAt', 'DESC']] // Optional: Sort by newest first
        });
    
        res.status(200).json(properties);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch your properties' });
    }
  };


  // Update Property
exports.updateProperty = async (req, res) => {
    try {
      const property = await Property.findByPk(req.params.id);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Ensure only the owner can update
      if (property.userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to update this property' });
      }
  
      const { title, description, price, location } = req.body;
  
      await property.update({
        title: title || property.title,
        description: description || property.description,
        price: price || property.price,
        location: location || property.location,
      });
  
      res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating property' });
    }
  };

  exports.deleteProperty = async (req, res) => {
    try {
      const property = await Property.findByPk(req.params.id);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Ensure only the owner can delete
      if (property.userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to delete this property' });
      }
  
      await property.destroy();
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting property' });
    }
  };

  