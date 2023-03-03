import Deparetement from "../models/deparetment.js";

import { createError } from "../utils/error.js";

export const createDeparetement = async (req, res, next) => {
  const newDeparetement = new Deparetement(req.body);

  try {
    const savedDeparetement = await newDeparetement.save();
    res.status(200).json(savedDeparetement);
  } catch (err) {
    next(err);
  }
};

export const updateDeparetement = async (req, res, next) => {
  const id = req.params.id
    try {
      const updatedDeparete = await Deparetement.updateOne(
        {id},
        {$push: { departement: req.body }},
        { new: true }
      );
      res.status(200).json(updatedDeparete);
    } catch (err) {
      next(err);
    }
  };

export const getDeparetements = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const deparetements = await Deparetement.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(deparetements);
  } catch (err) {
    next(err);
  }
};
