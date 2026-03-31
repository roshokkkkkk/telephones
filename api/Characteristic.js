import mongoose from 'mongoose';

const characteristicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Characteristic', characteristicSchema);
