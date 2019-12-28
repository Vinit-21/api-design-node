// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions',(req,res) => {
  res.json(lions);
});

app.get('/lions/:id',(req,res) => {
  var lionIndex = _.findIndex(lions, {id: req.params.id});
  if(lionIndex == -1){
    res.json({message: "Lion not Found"}); 
  }
  else{
    res.json(lions[lionIndex]);
  }
});

app.post('/lions',(req,res) => {
  var lion = req.body;
  if(lion.name != undefined){
  lion.id = ''+(id+1);
  id+=1
  lions.push(lion);
  res.json(lion);
  }
  else{
    res.json({message: "Invalid post"});
  }
});

app.put('/lions/:id',(req,res) => {
  var lionIndex = _.findIndex(lions, {id: req.params.id});
  if(lionIndex == -1){
    res.json({message: "Lion not Found"});
  }
  else{
    var lionId = lions[lionIndex].id;
    lions[lionIndex] = req.body;
    lions[lionIndex].id = lionId;
    res.json(lions[lionIndex]);
  }
});

app.delete('/lions/:id',(req,res) => {
  var lionIndex = _.findIndex(lions, {id: req.params.id});
  if(lionIndex == -1){
    res.json({message: "Lion not Found"});
  }
  else{
    var lion = lions[lionIndex];
    lions.splice(lionIndex,1);
    res.json(lion);
  }
});

app.listen(3000,function(){
console.log('on port 3000');
});