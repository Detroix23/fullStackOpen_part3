// index.js

const express = require('express');

const app = express();
app.use(express.json());

// Hardcoded data.
const persons = [
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

app.get('/', (_, response) => {
  console.log('index.app.get - / - Greetings.')
  response.send(`
    <h1>Phonebook backend.</h1>
    <a href="./api/persons">See <code>/api</a>
  `);
});

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

app.get('/api/persons', (_, response) => {
  console.log('index.app.get - /api/persons/ - Responding with persons:', persons);

  response.json(persons);
});

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
})


const PORT = 3001;

app.listen(PORT);
console.log(`index - 'Phonebook' server running on port ${PORT}.`);
