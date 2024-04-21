import mongoose, { Schema, model, Document } from 'mongoose';

export   interface IProduct extends Document {
  title: string;
  img: string;
  price: number;
  discountPrice?: number | null;
  description: string;
  category: string;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  numReviews: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  }
});

const Product =  ( mongoose.models.Product as mongoose.Model<IProduct>) || mongoose.model<IProduct>('Products', productSchema);

export default Product;
