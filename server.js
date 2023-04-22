const express = require('express');
const path = require('path')
const fs = require('fs');
const PORT = 3001;
const notes = require('./db/db.json');

const app = express();


app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// GET request for ALL reviews
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname,'/public/notes.html'))
}
)
app.get('/api/notes', (req, res) => {
  // Sending all notes
//   fs.readFile('./db/db.json','utf8', (err, notes) => {
//     if (err) {
//       return res.status(500).json({ err });
//     } 
//     const data = JSON.parse(notes);
    return res.status(200).json(notes);
 
});
app.post('/api/notes', (req,res) => {
   

        let data = req.body;
       
        notes.push(data);
      
      
        
        fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 2), (err) =>{
        err
          ? console.error(err)
          : console.log(
            `New note has been saved to the database ${notes}`
          )
          res.send("Success")
          console.log(goku);
    
        }
     );
    });

    
 



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
