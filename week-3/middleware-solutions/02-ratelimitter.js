const express = require("express");
const app = express();

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 2000)

app.use((req, res, next) => {
  const userId = req.headers["user-id"];
  if(numberOfRequestsForUser[userId]){
    numberOfRequestsForUser[userId] = numberOfRequestsForUser[userId] + 1;    
      if(numberOfRequestsForUser[userId] > 5){
        res.status(404).send("No more Request allowed");
      }else{
        next();
      }
  }else{
    numberOfRequestsForUser[userId] = 1;
    next();
  }
  
})

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;