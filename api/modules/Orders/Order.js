import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    status: { type: String, required: true, default: 'created', trim: true },
    total: { type: Number, required: true, min: 0 },
    orderDate: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
