import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const TransactionModel = model('Transaction', TransactionSchema);

export default TransactionModel;
