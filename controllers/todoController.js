let data = [{ item: 'Cook' }, { item: 'Code' }, { item: 'Sleep' }, { item: 'Repeat' }]
const mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb+srv://test:test@todos.vxfqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//Create a schema
const todoSchema = new mongoose.Schema({
  item: String
});

//Create model
const Todo = mongoose.model('Todo', todoSchema);
const itemOne = Todo({item: "Cook"}).save((err)=>{
  if(err) throw err;
  console.log('item saved');
});

module.exports = function (app) {
  app.get('/todo', function(req,res){
    res.render('todo', {todos: data})
  })

  app.post('/todo', function (req, res) {
    data.push(req.body);
    res.json({ todos: data });
  })

  app.delete('/todo/:item', function (req, res) {
    data = data.filter((todo) => todo.item.replace(/ /g, "-") !== req.params.item);
    res.json({ todos: data });
  })
};
