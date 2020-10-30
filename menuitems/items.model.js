const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  available: Boolean,
  imageUrl: String,
  description: String
});

const Item = mongoose.model('Items', itemSchema);

itemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
itemSchema.set('toJSON', {
  virtuals: true
});

itemSchema.findById = function (cb) {
  return this.model('Items').find({id: this.id}, cb);
};

exports.findByName = (name) => {
  return Item.find({name: name});
};

exports.findById = (id) => {
  return Item.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.createItem = (itemData) => {
  const item = new Item(itemData);
  return item.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      Item.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, items) {
              if (err) {
                  reject(err);
              } else {
                  resolve(items);
              }
          })
  });
};

exports.patchItem = (id, itemData) => {
  return Item.findOneAndUpdate({
      _id: id
  }, itemData);
};

exports.removeById = (itemId) => {
  return new Promise((resolve, reject) => {
      Item.deleteMany({_id: itemId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};