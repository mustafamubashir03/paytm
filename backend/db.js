const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://mustafamubashir87:mustafamubashir0333@cluster0.qtoikyf.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: { type: String, unique: true, minLength: 5 },
});

const accountSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type:Number,
    required:true
  }
});

const UserAccount = mongoose.model("UserAccount", accountSchema);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  UserAccount,
};
