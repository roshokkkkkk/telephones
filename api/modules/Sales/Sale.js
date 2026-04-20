import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dateSold: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Sale', saleSchema);
