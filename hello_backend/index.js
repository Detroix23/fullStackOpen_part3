// index.js

const express = require('express');

const app = express();

app.use(express.json());

let notes = [
  {   
    id: "1",    
    content: "HTML is easy",    
    important: true  
  },  
  {    
    id: "2",    
    content: "Browser can execute only JavaScript",    
    important: false  
  },  
  {    
    id: "3",    
    content: "GET and POST are the most important methods of HTTP protocol",    
    important: true  
  }
];

const generateNextId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0;

  return String(maxId);
}


app.get('/', (request, response) => {
  response.send(`
    <h1>Hello backend !</h1>
    <a href="./api/notes">See here for notes</a>
  `);
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  console.log('index.app.get - /api/notes/:id - parms:', request.params);
  const id = request.params.id;
  const found = notes.find(note => note.id === id);

  if (found) {
    response.json(found);
  } else {
    response.statusMessage = `index.app.get - /api/notes/:id - Id (${id}) not found in notes.`;
    response
      .status(404)
      .end();
  }
})

app.delete('/api/notes/:id', (request, response) => {
  console.log('index.app.delete - /api/notes/:id - params:', request.params);
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);
  
  response
    .status(204)
    .end();
});

app.post('/api/notes', (request, response) => {
  console.log('index.app.post - /api/notes - headers:', request.headers);
  
  const body = request.body;
  console.log('index.app.post - /api/notes - note:', body);
  
  if (!body.content) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }
  
  const note = {
    id: generateNextId(),
    content: body.content,
    important: body.important || false,
  }

  notes = notes.concat(note);

  response.json(note);
});


const PORT = 3001;

app.listen(PORT);
console.log(`index - Server running on port ${PORT}.`);
