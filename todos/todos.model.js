const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  note: String,
  created: String,
  done: Boolean
});

const Todo = mongoose.model('Todos', todoSchema);

todoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

todoSchema.set('toJSON', {
  virtuals: true
});

todoSchema.findById = function (cb) {
  return this.model('Todos').find({id: this.id}, cb);
};

exports.findByState = (done) => {
  return Todo.find({done: done});
};

exports.findById = (id) => {
  return Todo.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.createTodo = (todoData) => {
  const todo = new Todo(todoData);
  return todo.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Todo.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, todos) {
              if (err) {
                  reject(err);
              } else {
                  resolve(todos);
              }
          })
  });
};

exports.patchTodo = (id, todoData) => {
  return Todo.findOneAndUpdate({
      _id: id
  }, todoData);
};

exports.removeById = (todoId) => {
  return new Promise((resolve, reject) => {
    Todo.deleteMany({_id: todoId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};