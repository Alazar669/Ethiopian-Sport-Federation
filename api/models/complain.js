import mongoose from "mongoose";
const ComplainSchema = new mongoose.Schema(
  {
    complainTitle: {
      type: String,
      required: true
    },
    answerTitle: {
      type: String,
      required: false
    },
    answerDetail: {
      type: String,
      required: false
    },
    answerImage: {
      type: [String], 
      required: false
    },
    answerDocument:{
      type: [String], 
    },
    complainDetail: {
      type: String,
      required: true   
    },
    image: {
      type: [String], 
    },
    document: {
      type: [String],

    },
    dateComplainRegistered: {
      type: [Date]
    },
    isstatus: {
      type: Boolean,
      default: false
      //  false mean still it is pending
    },
    status : {
      type: String,
      default: "opened"
    },
    
    ceoComments: {
      type: String,
      required: false
    },
    ceoCommentOnRejection: {
      type: String,
      required: false
    },
    isCommentedByCeo: {
      type: Boolean,
      default: false
    },
    canceledCase: {
      type: Boolean,
      default: false
    },
    ceoCommentOnCancel: {
      type: String,
      required: false
    },
    headComments: {
      type: String,
      required: false
    },
    appointmentDate: {
      type: [Date]
    },
    phoneNumber: {
      type: String,
      required: false
    },
    
    complainDep: {
      type: String,
      required: false
    },
    complainAnalayzer: {
      type: String,
      required: false
    },
    fullName: {
      type: String,
      required: true
    },
    newToCeo: {
      type: Boolean,
      default: true
    },
    newToDepHead: {
      type: Boolean,
      default: false
    },
    newToDepMember: {
      type: Boolean,
      default: false
    },
    assignedToCeo: {
      type: Boolean,
      default: false
    },
    assignedToDepHead: {
      type: Boolean,
      default: false
    },
    assignedToDepMember: {
      type: Boolean,
      default: false
    },
    closedByCeo: {
      type: Boolean,
      default: false
    },
    closedByMember: {
      type: Boolean,
      default: false
    }, 
    closedByDepHead: {
      type: Boolean,
      default: false
    },
    isRegistered: {
      type: Boolean,
      defalut: false
    } ,
    isPending: {
      type: Boolean,
      defalut: false
    },
    isClosed: {
      type: Boolean,
      defalut: false
    },
    isAppointed: {
      type: Boolean,
      defalut: false
    },
    isRejected: {
      type: Boolean,
      default: false
    },
    isAnswered: {
      type: Boolean,
      default: false
    }   
  },
  { timestamps: true }
);

export default mongoose.model("Complain", ComplainSchema);
