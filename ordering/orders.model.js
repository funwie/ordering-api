const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  totalPrice: String,
  totalQuantity: Number,
  orderedOn: Date,
  status: String,
  description: String,
  customer: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  orderItems: [{ type: Schema.Types.ObjectId, ref: 'Items' }]
});

const Order = mongoose.model('Orders', orderSchema);

orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
orderSchema.set('toJSON', {
  virtuals: true
});

orderSchema.findById = function (cb) {
  return this.model('Orders').find({id: this.id}, cb);
};

exports.findByStatus = (status) => {
  return Order.find({status: status});
};

exports.findById = (id) => {
  return Order.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.createOrder = (orderData) => {
  const order = new Order(orderData);
  return order.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Order.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, orders) {
              if (err) {
                  reject(err);
              } else {
                  resolve(orders);
              }
          })
  });
};

exports.patchOrder = (id, orderData) => {
  return Order.findOneAndUpdate({
      _id: id
  }, orderData);
};

exports.removeById = (orderId) => {
  return new Promise((resolve, reject) => {
    Order.deleteMany({_id: orderId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};