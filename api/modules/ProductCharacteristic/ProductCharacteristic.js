import mongoose from 'mongoose';

const productCharacteristicSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    characteristicId: { type: mongoose.Schema.Types.ObjectId, ref: 'characteristic', required: true },
    value: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

productCharacteristicSchema.index({ productId: 1, characteristicId: 1 }, { unique: true });

export default mongoose.model('ProductCharacteristic', productCharacteristicSchema);
