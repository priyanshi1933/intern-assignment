import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBookmark extends Document {
  userId: Types.ObjectId;
  url: string;
  domain: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const BookmarkSchema: Schema<IBookmark> = new Schema<IBookmark>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
   tags: {
      type: [String],
      default: [], 
    },
  },
  {
    timestamps: true,
  },
);
export const BookmarkModel = mongoose.model<IBookmark>(
  "Bookmark",
  BookmarkSchema,
);
