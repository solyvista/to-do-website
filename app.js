const express = require('express')                  
const cors = require('cors')                        
const csv = require('csv-parser');                  
const fs = require('fs');                           
const ObjectsToCsv = require('objects-to-csv')      

const port = process.env.PORT || 5000               
let morgan = require('morgan')                      
let bodyParser = require('body-parser');            
const corsOptions = {                               
    origin: '*'
}

const app = express()                               
app.use(bodyParser.json());                        
app.use(morgan('combined'))                         
app.use(cors(corsOptions))                          


let todoListe = []                                  

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        todoListe.push(row)
    })

app.get("/", (request, response) => {
    response.json({
        greeting: "Hello World of Techstarter!"
    })
});


app.get('/todos', (request, response) => {

   response.json(todoListe)
    
})


app.post('/todos', function(request, response) {

let lastId = 0;

  for(let i=0; i<todoListe.length; i++){
    let currentId = parseInt(todoListe[i] ['id']);
    if(currentId > lastId){
        lastId = currentId;
    }


  }

    let item = {
        id: lastId + 1,
        name: request.body['name'],
        done: "false"
    }

    todoListe.push(item);

    const csv = new ObjectsToCsv(todoListe);
    csv.toDisk("./data.csv");
 
    response.json(todoListe)

    
});


app.put('/todos', function(request, response) {

    let id = request.body['id']

    for(let i=0; i<todoListe.length; i++){
        if(todoListe[i]['id'] == id){
            todoListe[i]['done'] = request.body['done'].toString();
            const csv = new ObjectsToCsv(todoListe);
            csv.toDisk("./data.csv");
        }
      }
      response.json(todoListe)
});

app.delete('/todos/:id', function(request, response) {

    let id = request.params['id']

    for(let i=0; i<todoListe.length; i++){
        if(todoListe[i]['id'] == id){
            todoListe.splice(i, 1)

            const csv = new ObjectsToCsv(todoListe);
            csv.toDisk("./data.csv");
        }

    }
    response.json(todoListe)
});


app.listen(port, () => console.log(`Techstarter_ToDoApp listening on port ${port}!`))