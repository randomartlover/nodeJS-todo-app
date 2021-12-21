const mongoose = require('mongoose');

//Connect to database
mongoose.connect('ADD_DB_URL_WITH_USERNAME_AND_PASSWORD')

//Create a schema
const todoSchema = new mongoose.Schema({
  item: String
});

//Create model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = function (app) {
  app.get('/todo', function(req,res){
    Todo.find({}, (err, data)=>{
      if(err) throw err;
      res.render('todo', {todos: data})
    });
  })

  app.post('/todo', function (req, res) {
    const newTodo = Todo(req.body).save((err, data)=> {
      if(err) throw err;
      res.json({ todos: data });
    });
  })

  app.delete('/todo/:item', function (req, res) {
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data)=>{
      if(err) throw err;
      res.json({ todos: data });
    });
  });
};
