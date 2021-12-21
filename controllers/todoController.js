let data = [{ item: 'Cook' }, { item: 'Code' }, { item: 'Sleep' }, { item: 'Repeat' }]

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
