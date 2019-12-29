// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
var _ = require('lodash');
var tigerRouter = require('express').Router();

var tigers = [];
var id = 0;

tigerRouter.use(function(req, res, next){
  console.log("tiger");
  next();
});

var updateId  = function(req, res, next) {
  if(!req.body.name){
    id+=1;
    req.body.id = id+'';
  }
  next();
}

tigerRouter.param('id',(req, res, next, id) => {
  var tigerIndex = _.findIndex(tigers, {id: id});
  if(tigerIndex >= 0){
    req.tigerIndex = tigerIndex;
    next();
  }
  res.json();
});

tigerRouter.get('/', (req , res) => {
    res.json(tigers);
});

tigerRouter.post('/', updateId, (req , res) => {
  var tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
});

tigerRouter.get('/:id', (req , res) => {
  res.json(tigers[req.tigerIndex]);
});

tigerRouter.put('/:id',(req, res) => {
  var newTiger = req.body;
  var oldTiger = tigers[req.tigerIndex];
  newTiger.id = oldTiger.id;
  tigers[req.tigerIndex] = newTiger;
});

tigerRouter.delete('/:id',(req, res) => {
  res.json(tigers[req.tigerIndex]);
  tigers.splice(req.tigerIndex,1);
});

module.exports = tigerRouter;