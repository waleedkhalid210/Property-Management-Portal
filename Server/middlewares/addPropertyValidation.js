const joi = require("joi");

const propertyAddingValidation = (req, res, next) => {
  const schema = joi.object({
    propertyTitle: joi.string().min(5).max(120).required(),
    propertyType: joi.string().valid("Apartment", "House", "Villa", "Commercial").required(),
    price: joi.number().positive().required(),
    status: joi.string().valid("Active", "Sold", "Rented").required(),
    description: joi.string().required(),
    city: joi.string().required(),
    fullAddress: joi.string().required(),
    bedRooms: joi.number().integer().min(0).max(50).required(),
    bathRooms: joi.number().integer().min(0).max(50).required(),
    area: joi.number().positive().required(),
    owner: joi.string().hex().length(24).required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Property validation failed",
      errors: error.details.map((detail) => detail.message)
    });
  }

  if (!req.files || req.files.length < 1) {
    return res.status(400).json({
      message: "At least one image is required",
      success:false
    });
  }

  if (req.files.length > 2) {
    return res.status(400).json({
      message: "You can upload a maximum of 3 images",
      success: false,
    });
  }

  next();
};

module.exports = propertyAddingValidation;