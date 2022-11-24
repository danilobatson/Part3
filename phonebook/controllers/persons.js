const personsRouter = require('express').Router();
const Person = require('../models/persons');

personsRouter.get('/', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

personsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await Person.findById(id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

personsRouter.post('/', async (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
  });

  try {
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (exception) {
    next(exception);
  }
});

personsRouter.delete(':id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

personsRouter.put('/:id', async (req, res, next) => {
  const { name, number } = req.body;
  const person = {
    name,
    number,
  };

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      person,
      { new: true, runValidators: true, context: 'query' }
    );
    res.json(updatedPerson);
  } catch (exception) {
    next(exception);
  }
});

module.exports = personsRouter;
