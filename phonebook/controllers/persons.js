const personsRouter = require('express').Router();
const Person = require('../models/persons');

personsRouter.get('/', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

personsRouter.post('/', (req, res, next) => {
  const { name, number } = req.body;
  const body = req.body;

  const person = new Person({
    name,
    number,
  });
  person
    .save()
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));

  // !name
  //   ? res.status(400).json({ error: 'name missing' })
  //   : !number
  //   ? res.status(400).json({ error: 'number missing' })
  //   : !body
  //   ? res.status(400).json({ error: 'body missing' })
  //   : name.length < 3
  //   ? res.status(400).json({ error: 'name must be at least 3 characters long' })
  //   : null;

  // Person.findOneAndUpdate({ name: body.name }, { number: body.number }).then(
  //   (persons) => {
  //     if (persons) {
  //       res.json(persons);
  //     } else {
  //       const person = new Person({
  //         name: body.name,
  //         number: body.number,
  //       });
  //       person
  //         .save()
  //         .then((savedPerson) => {
  //           res.json(savedPerson);
  //         })
  //         .catch((error) => next(error));
  //     }
  //   }
  // );
});

personsRouter.delete(':id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

personsRouter.put('/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
