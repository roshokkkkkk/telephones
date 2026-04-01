import mongoose from 'mongoose';

const roleUserSchema = new mongoose.Schema(
  {
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

roleUserSchema.index({ roleId: 1, userId: 1 }, { unique: true });

export default mongoose.model('RoleUser', roleUserSchema);
