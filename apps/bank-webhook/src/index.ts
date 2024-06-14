import express from "express";
import db from "@repo/db/client";
const app=express();
  app.get("/hdfcWebhook",async (req,res)=>{
    // Add input validation here, ZOD
    // check the request actually came hdfc bank, use webhook secret here 

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
        };

       const balance=await db.balance.findFirst({
            where:{
                userId:paymentInformation.userId
            }
        });

    try{
      await db.balance.update({
          where:{
            userId:paymentInformation.userId
          },
          data:{
            amount:balance+paymentInformation.amount
          }
       });

       await db.onRampTransaction.update({
            where :{
                token:paymentInformation.token
            },
            data:{
                status:"Success"
            }
       });
       res.json({
        msg:"captured"
       })
    }
    catch(e){
        console.log(e);
        db.onRampTransaction.update({
            where :{
                token:paymentInformation.token
            },
            data:{
                status:"Failure"
            }
        })
        res.status(411).json({
            msg:"Failed to capture payment" 
        })
    }
  })
