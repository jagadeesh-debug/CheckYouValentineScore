import mongoose from "mongoose"

const ResultSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  percentage: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Result || 
mongoose.model("Result", ResultSchema)
