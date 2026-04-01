import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    house: { type: String, required: true, trim: true },
    apartment: { type: String, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Address', addressSchema);
