const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  gender :{
    type: String
  },
  dob :{
    type : Date
  },
  news :{
    type: Boolean
  },

  email:{
    type: String,
  },
  photo :{
    type :String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", UserSchema)