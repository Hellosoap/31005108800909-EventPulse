const {validationResult} = require('express-validator');

const validator = (req, res, next) => {
  const errorsList = validationResult(req);
  if(!errorsList.isEmpty()){
    return res.status(422).json({
      status: 'Fail',
      errors: errorsList.array()
    });
  }
  next();
};

module.exports = validator;