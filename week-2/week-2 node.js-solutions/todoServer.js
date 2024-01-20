const express = require('express');
const fs = require('fs')
  
const app = express();

app.use(express.json());    

app.get('/todos/', (req, res) => {
  fs.readFile("todos.json", 'utf-8', (err, data) => {
    if(err) throw err
    res.status(200).send(data)
  })
})


app.get('/todos/:id', async (req, res) => {    
  const id = req.params.id    
  fs.readFile("todos.json", 'utf-8', (err, data) => {
    if(err) throw err;
    const parsedTodoList = JSON.parse(data);    
    const index = parsedTodoList.findIndex(eachTodo => eachTodo.id == id);

    if(index != -1){
      const todo = parsedTodoList.filter(eachtodo => eachtodo.id == id);
      res.status(200).send(todo);
    }else{
      res.status(404).send("Todo Not Found")
    }
})
})

app.post('/todos', (req, res) => {
  const {title, description} = req.body  
  fs.readFile("todos.json", 'utf-8', (err, data) => {
    if (err) throw err;
    const parsedTodoList = JSON.parse(data)
    const id = parsedTodoList.length + 1
     const todo = {
       id: id,
       title: title,
       completed: false,
       description: description
     }        
    parsedTodoList.push(todo)

    const updatedTodo = JSON.stringify(parsedTodoList)

    fs.writeFile("todos.json", updatedTodo, (err, data) => {
      res.status(201).send({id})
    })
  })

})

app.put('/todos/:id', (req, res) => {
  const {id} = req.params;
  fs.readFile("todos.json", 'utf-8', (err, data) => {
    if (err) res.status(500)
    
    let parsedTodoList = JSON.parse(data)
    const index = parsedTodoList.findIndex(eachTodo => eachTodo.id == id)    
    
    if (index != -1) {      
      parsedTodoList[index] = {
          id,
          title: req.body.title || parsedTodoList[index].title,
          completed: req.body.completed || parsedTodoList[index].completed,
          description: req.body.description || parsedTodoList[index].description
      }

      const updatedTodo = JSON.stringify(parsedTodoList)
      fs.writeFile("todos.json", updatedTodo, (err) => {
        if(err){
          res.status(500)
        }
        res.status(201).send("Todo updated successfully");
      })
    }else{
      res.status(404).send("Not found")
    }
  })
})


app.delete('/todos/:id', (req, res) => {
  const {id} = req.params;
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err
    const parsedTodoList = JSON.parse(data);    
    
    const index = parsedTodoList.findIndex(eachTodo => eachTodo.id == id);    

    if(index != -1){
      parsedTodoList.splice(index, 1);

    fs.writeFile("todos.json", JSON.stringify(parsedTodoList), (err) => {
      if(err) throw err
      res.status(200).send("Todo deleted Successfully");
    })
    }else{
      res.status(404).send("Todo not found");
    }    
  })
})

app.use((req, res, next) => {
  res.status(404).send("Invalid Route");
})




module.exports = app;