import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDepatementHead:{
      type: Boolean,
      default: false
    },
    isDepartementMember:{
      type: Boolean,
      default: false
    },
    isCeo:{
      type: Boolean,
      default: false
    },
    isClient:{
      type: Boolean,
      default: false
    },
    departement: {
      type: String
      
    },
    actionPlan: [
      { 
        dates: {type: Date}, 
        todos: [String],
        isCompleted: false
      }
    ],  
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
