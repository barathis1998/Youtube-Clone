import mongoose from "mongoose";
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmedEmail:{
    type:Boolean,
    default:false,
    required:true
  }
});

userSchema.index({
  firstName: 'text',
  lastName: 'text'
}, {
  name: 'firstNameLastNameIndex',
  default_language: 'english',
  weights: {
    firstName: 2,
    lastName: 1
  }
});


userSchema.virtual('videos',{
  ref:'Video',
  localField:'_id',
  foreignField:'userId',
  justOne:false,
  count:true
})

userSchema.virtual('subscribers', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'channelId',
  justOne: false,
  count: true,
  match: function() {
    return { subscriberId: this._id };
  }
});


userSchema.methods.getSignedJwtToken = function () {
  console.log("inside getSignedJwtToken");
  console.log("this: ", this);
  console.log(this._id);
  try {
    const token = jwt.sign({ id: this._id }, 'mysecretkey');
    console.log("token: ", token);
    return token;
  } catch (err) {
    console.log("Error generating token: ", err);
    throw new Error("Error generating token");
  }
}



const User = mongoose.model("User", userSchema);
export default User;
