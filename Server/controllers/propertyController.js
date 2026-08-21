const Property = require("../models/properties");

const addproperty = async (req, res) => {
  try {
    const {
      propertyTitle,
      propertyType,
      price,
      status,
      description,
      city,
      fullAddress,
      bedRooms,
      bathRooms,
      area,
      owner
    } = req.body;

    const images = req.files.map((file) => file.filename);

    const property = await Property.create({
      propertyTitle,
      propertyType,
      price,
      status,
      description,
      city,
      fullAddress,
      bedRooms,
      bathRooms,
      area,
      images,
      owner
    });

    return res.status(201).json({
      success: true,
      message: "Property added successfully",
      property
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add property",
      error: error.message
    });
  }
};


const getMyProperties = async (req, res) => {
  try {
    const userId = req.query.userId;

    const properties = await Property.find({ owner: userId }).sort({ price: 1 });

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      properties
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message
    });
  }
}
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      propertyTitle,
      propertyType,
      price,
      status,
      description,
      city,
      fullAddress,
      bedRooms,
      bathRooms,
      area
    } = req.body;

    const updateFields = {
      propertyTitle,
      propertyType,
      price,
      status,
      description,
      city,
      fullAddress,
      bedRooms,
      bathRooms,
      area
    };

    if (req.files && req.files.length > 0) {
      updateFields.images = req.files.map((file) => file.filename);
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const { title, city, propertyType, minprice, maxprice } = req.query;

    const query = {};

    if (title && title.trim() !== "") {
      query.propertyTitle = { $regex: title.trim(), $options: "i" };
    }

    if (city && city.trim() !== "") {
      query.city = { $regex: city.trim(), $options: "i" };
    }

    if (propertyType && propertyType.trim() !== "") {
      query.propertyType = propertyType;
    }

const price = {};
if (minprice && !isNaN(minprice) && minprice !== "") price.$gte = Number(minprice);
if (maxprice && !isNaN(maxprice) && maxprice !== "") price.$lte = Number(maxprice);
if (Object.keys(price).length > 0) query.price = price;

    const properties = await Property.find(query).sort({ price: 1 });

    res.status(200).json({
      success: true,
      properties
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message
    });
  }
};

module.exports = {
  addproperty,
  getMyProperties,
  deleteProperty,
  updateProperty,
  getAllProperties
};