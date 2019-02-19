var Animal = require('../models/model.animals'),
	constant = require('../../config/constants'),
	Gen = require('../modules/module.generic'),
	objectID = require('mongodb').ObjectID;

module.exports.getAnimals = function (req, res, next) {
	try {
		var decrypt = req.body;
		if (decrypt) {
			var limit = constant.ADMIN_LIST_LIMIT;
			if (decrypt.pageSize >= 5) {
				limit = decrypt.pageSize;
			}
			var skip = 0;
			if (decrypt.pageNo) {
				skip = (limit * decrypt.pageNo) - limit;
			}
			Animal.find({}).sort({ dateUpdated: -1 }).skip(skip).limit(limit).exec(function (err, animal) {
				if (err) {
					return res.json(Gen.responseReturn(constant.EXCEPTION));
				} else if (animal.length > 0) {
					return res.json(Gen.responseReturn(constant.SUCCESS, animal, true));
				} else {
					return res.json(Gen.responseReturn(constant.NO_DATA, [], false));
				}
			})
		} else {
			return res.json(Gen.responseReturn(constant.AUTH_ERROR));
		}
	} catch (Exception) {
		return res.json(Gen.responseReturn(constant.EXCEPTION));
	}
}
module.exports.getAnimalById = function (req, res, next) {
	try {
		var decrypt = req.body;
		if (decrypt && objectID.isValid(decrypt.animalId)) {
			Animal.findOne({
				_id: objectID(decrypt.animalId)
			}).exec(function (err, animal) {
				if (err) {
					return res.json(Gen.responseReturn(constant.EXCEPTION));
				} else if (animal) {
					return res.json(Gen.responseReturn(constant.SUCCESS, animal, true));
				} else {
					return res.json(Gen.responseReturn(constant.NO_DATA, {}, true));
				}
			})
		} else {
			return res.json(Gen.responseReturn(constant.AUTH_ERROR));
		}
	} catch (Exception) {
		return res.json(Gen.responseReturn(constant.EXCEPTION));
	}
}

module.exports.addAnimal = function (req, res, next) {
	try {
		var decrypt = req.body;
		if (decrypt) {
			var update = new Animal();
			var serach = {};
			update.type = serach.type = decrypt.type;
			update.category = serach.category = decrypt.category;
			update.breed = serach.breed = decrypt.breed;
			update.height = serach.height = decrypt.height;
			update.weight = serach.weight = decrypt.weight;
			update.food = serach.food = decrypt.food;
			update.speed = serach.speed = decrypt.speed;
			update.color = serach.color = decrypt.color;
			Animal.find(serach).exec(function (err, animal) {
				if (err) {
					return res.json(Gen.responseReturn(constant.EXCEPTION));
				} else if (animal.length > 0) {
					return res.json(Gen.responseReturn(constant.ANIMAL_EXISTS, {}, false));
				} else {
					update.save(function (err, saved, affected) {
						if (!err && saved && (affected == 1)) {
							return res.json(Gen.responseReturn(constant.ANIMAL_ADDED, {}, true));
						} else {
							return res.json(Gen.responseReturn(constant.EXCEPTION));
						}
					})
				}
			});
		} else {
			return res.json(Gen.responseReturn(constant.AUTH_ERROR));
		}
	} catch (Exception) {
		return res.json(Gen.responseReturn(constant.EXCEPTION));
	}
}
module.exports.editAnimal = function (req, res, next) {
	try {
		var decrypt = req.body;
		if (decrypt && objectID.isValid(decrypt._id)) {
			var update = {};
			var serach = {};
			update.type = serach.type = decrypt.type;
			update.category = serach.category = decrypt.category;
			update.breed = serach.breed = decrypt.breed;
			update.height = serach.height = decrypt.height;
			update.weight = serach.weight = decrypt.weight;
			update.food = serach.food = decrypt.food;
			update.speed = serach.speed = decrypt.speed;
			update.color = serach.color = decrypt.color;

			var inputParam = {};
			inputParam._id = new objectID(decrypt._id);
			Animal.find(serach).exec(function (err, animal) {
				if (err) {
					return res.json(Gen.responseReturn(constant.EXCEPTION));
				} else if (animal.length > 0) {
					return res.json(Gen.responseReturn(constant.ANIMAL_EXISTS, {}, false));
				} else {
					Animal.findOneAndUpdate(inputParam, update, { upsert: true }, function (err, updated) {
						if (err) {
							return res.json(Gen.responseReturn(constant.EXCEPTION));
						} else if (updated) {
							return res.json(Gen.responseReturn(constant.ANIMAL_UPDATE, {}, true));
						} else {
							return res.json(Gen.responseReturn(constant.EXCEPTION));
						}
					})
				}
			});

		} else {
			return res.json(Gen.responseReturn(constant.AUTH_ERROR));
		}
	} catch (Exception) {
		return res.json(Gen.responseReturn(constant.EXCEPTION));
	}
}


module.exports.deleteAnimal = function (req, res, next) {
	try {
		var decrypt = req.body;
		if (objectID.isValid(decrypt._id)) {
			Animal.remove({ _id: new objectID(decrypt._id) }, function (err, obj) {
				if (err) {
					return res.json(Gen.responseReturn(constant.EXCEPTION));
				} else {
					return res.json(Gen.responseReturn(constant.ANIMAL_DELETE, {}, true));
				}
			});
		} else {
			return res.json(Gen.responseReturn(constant.EXCEPTION));
		}
	} catch (Exception) {
		return res.json(Gen.responseReturn(constant.EXCEPTION));
	}
}