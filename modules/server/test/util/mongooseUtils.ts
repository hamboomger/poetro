import mongoose from 'mongoose';

function generateId(): string {
  return mongoose.Types.ObjectId().toString();
}

export default {
  generateId,
};
