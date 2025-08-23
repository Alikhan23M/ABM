import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // example: "Managers We Have"
  },
  icon: {
    type: String,
    required: true, // example: "FaUsers"
  },
  sourceType: {
    type: String,
    enum: ["collection", "custom"], // collection → count from DB, custom → use provided number
    required: true
  },
  collectionName: {
    type: String,
    default: null // only used when sourceType is "collection"
  },
  targetValue: {
    type: Number,
    default: null // only used when sourceType is "custom"
  },
  redirectLink: {
    type: String,
    required: true // example: "/projects" or "/events"
  }
  ,
  isArchived:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Stats", statsSchema);
