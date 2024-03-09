const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    orderFoods: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        amount: Number,
      },
    ],
    totalSum: Number,
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
    deliveryAddress: String,
    deliveryStatus: String,
  },
  {
    timestamps: true,
    collection: "order",
  }
);

module.exports = mongoose.model("Order", orderSchema);
