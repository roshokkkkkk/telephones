import mongoose from 'mongoose';

const productCharacteristicSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    characteristicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Characteristic', required: true },
    value: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

productCharacteristicSchema.index({ productId: 1, characteristicId: 1 }, { unique: true });

export default mongoose.model('ProductCharacteristic', productCharacteristicSchema);
