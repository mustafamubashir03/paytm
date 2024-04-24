const express = require("express");
const { authMiddleware } = require("../middleware");
const { UserAccount } = require("../db");
const router3 = express.Router();

router3.get("/balance", authMiddleware, async (req, res) => {
  const id = req.Id;
  const accountFound = await UserAccount.findOne({ referenceId: id });
  res.json({ balance: accountFound.balance });
});

router3.post("/transfer",authMiddleware, async(req,res)=>{
    const {to,amount} = req.body;
    const id = req.userId;
    const accountFound = await UserAccount.findOne({referenceId:id});
    const userBalance = accountFound.balance;
    if (userBalance < amount){
      res.status(400).json({message:"Insufficient balance"});

    }
    const recieverFound = await UserAccount.findOne({referenceId:to});
    if(!recieverFound){
      res.status(403).json({message:"Reciever not found"});
    }
    await UserAccount.updateOne({referenceId:id},{$inc: {balance: -amount}});
    await UserAccount.updateOne({referenceId:to},{$inc:{balance: amount}});
    res.json({message:"Transfer successful"});
})
module.exports = { router3 };
