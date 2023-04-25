const express = require('express');
const path = require('path')
const fs = require('fs');
const PORT = 3001;
let notes = require('./db/db.json');
const uuid = require('./helpers/uuid');


const app = express();


app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// GET request for ALL reviews
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  // Sending all notes
  fs.readFile('./db/db.json','utf8', (err, notes) => {
    if (err) {
      return res.status(500).json({ err });
    } 
    const data = JSON.parse(notes);
    return res.status(200).json(data);
  })
});
app.post('/api/notes', (req,res) => {

   

        let data = req.body;
        data.id = uuid();
        notes.push(data);
      
      
        
        fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 2), (err) =>{
        err
          ? console.error(err)
          : console.log(
            `New note has been saved to the database ${notes}`
          )
          res.send("Success")
         
    
        }
     );
    });

app.get('/api/notes/:id',(req,res)=>{
  fs.readFile('./db/db.json', 'utf8', (err, notes) => {
      if (err) {
        return res.status(500).json({ err });
      }

    const data = JSON.parse(notes);
    const note= data.at(req.params.id);
 if (!note){
    res.status(400).send("cannot get note with that id");
    return
  }
     res.status(200).json(note);

  })

});


app.delete('/api/notes/:id',(req,res)=>{
  fs.readFile('./db/db.json', 'utf8', (err, notesFromFile) => {
      if (err) {
        return res.status(500).json({ err });
      }
      let data = JSON.parse(notesFromFile);
      data = data.filter(note => note.id !== req.params.id)
  notes = data;
  fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 2), (err) =>{
        err
          ? console.error(err)
          : console.log(
            `Your note has been deleted from the database`
          )
          res.send("Success")
         
    
        })

});
});
    


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname,'/public/notes.html'))
}
)
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
