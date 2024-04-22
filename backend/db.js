const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mustafamubashir87:mustafamubashir0333@cluster0.qtoikyf.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:{type:String,unique:true},
    password:{type:String,unique:true, minLength:5}
})

const User = mongoose.model("User",userSchema);
module.exports = {
    User
} 