import mongoose from "mongoose";
const DeparementSchema = new mongoose.Schema(
  {
    departement: {
      type: [String]
    }  
  },
  { timestamps: true }
);

export default mongoose.model("Deparetement", DeparementSchema);
