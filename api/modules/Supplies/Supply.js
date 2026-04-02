import mongoose from 'mongoose';

const supplySchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dateReceived: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Supply', supplySchema);
