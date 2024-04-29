import { body, validationResult } from 'express-validator';

export const validateTrip = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB ObjectId'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Trip name is required')
    .isLength({ min: 2 })
    .withMessage('Trip name must be at least 2 characters long')
    .isAlphanumeric()
    .withMessage('Trip name should only contain letters and numbers')
    .escape(),
  body('start')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date format'),
  body('end')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date format'),
  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isNumeric()
    .withMessage('Duration must be a number'),
  body('currency')
    .notEmpty()
    .withMessage('Currency is required')
    .isString()
    .withMessage('Currency must be a string')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters long'),
  body('budget').optional().isNumeric().withMessage('Budget must be a number'),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      return next();
    }
    next({ status: 400, message: errors.array() });
  },
];