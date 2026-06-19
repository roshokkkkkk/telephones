import mongoose from 'mongoose';

const orderStatusSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    statusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
    dateTime: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('OrderStatus', orderStatusSchema);
