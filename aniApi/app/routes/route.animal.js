module.exports = function (app) {
    var animal = require('../controllers/controller.animal');
    app.route('/getAnimals').post(animal.getAnimals);
    app.route('/getAnimalById').post(animal.getAnimalById);
    app.route('/editAnimal').put(animal.editAnimal);
    app.route('/addAnimal').put(animal.addAnimal);
    app.route('/deleteAnimal').put(animal.deleteAnimal);
}