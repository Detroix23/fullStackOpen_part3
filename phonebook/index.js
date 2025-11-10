// index.js

const express = require('express');

const app = express();
app.use(express.json());

// Hardcoded data.
let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
];

/**
 * Return an integer between [a, b[.
 * @param {Number} a: Lower bound (inclusive)
 * @param {Number} b: Upper bound (exculsive)
 */
const randomInteger = (a, b) => {
  return Math.round(Math.random() * (b - a) + a);
}


// Home.
app.get('/', (_, response) => {
  console.log('index.app.get - / - Greetings.')
  response.send(`
    <h1>Phonebook backend.</h1>
    <a href="./api/persons">See <code>/api</a>
  `);
});

// Get informations about the service.
app.get('/info', (request, response) => {
  console.log('index.app.get - /info - Informations. Headers:', request.headers);
  
  datetime = new Date();
  console.log('index.app.get - /info - Date: ', datetime);

  response.send(`
    <h1>Informations</h1>
    <p>Phonebook has information for ${persons.length} people.</p>
    <p>Received: ${datetime}</p>
  `);
})

// Get all persons.
app.get('/api/persons', (_, response) => {
  console.log('index.app.get - /api/persons/ - Responding with persons:', persons);

  response.json(persons);
});

// Get a specific person by id.
app.get('/api/persons/:id', (request, response) => {
  console.log('index.app.get - /api/persons/:id - params:', request.params);

  const id = request.params.id;
  const found = persons.find(person => person.id === id);
  
  if (found) {
    response.json(found);
  } else {
    response.statusMessage = `index.app.get - /api/persons/:id - Id (${id}) not found`;
    response
      .status(404)
      .end();
  }
});

// Delete a person by id.
app.delete('/api/persons/:id', (request, response) => {
  console.log('index.app.delete - /api/persons/:id - params:', request.params);

  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);

  response
    .status(204)
    .end();
});

// Create a new person by Post.
app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log('index.app.post - /api/persons - body:', body);

  if (!body) {
    console.log('index.app.post - /api/persons - Empty body (400).');
    response
      .status(400)
      .json({
        error: 'Body is empty.'
      });
  } 
  
  if (persons.map(person => person.name).includes(body.name)) {
    console.log('index.app.post - /api/persons - Name already existant (400).');
    response
      .status(400)
      .json({
        error: `Name '${body.name}' is not unique.`
      });
  }

  if (!(body.name && body.number)) {
    console.log('index.app.post - /api/persons - Fields unfilled (400).');
    response
      .status(400)
      .json({
        error: `Both name (${body.name}) and number (${body.number}) can not be blank.`
      });
  }

  const newPerson = {
    id: String(randomInteger(0, Math.pow(2, 31) - 1)),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson);

  response.json(newPerson);

});


// Server
const PORT = 3001;

app.listen(PORT);
console.log(`index - 'Phonebook' server running on port ${PORT}.`);
