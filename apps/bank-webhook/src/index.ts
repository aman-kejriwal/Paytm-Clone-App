import express from "express";
import db from "@repo/db/client";
const app=express();
app.use(express.json());
  // handle request coming from the HDFC bank about a payment done through HDFC bank with user details,amount and a secret token.
  app.post("/hdfcWebhook",async (req,res)=>{
    // Add input validation here, ZOD
    // check the request actually came hdfc bank, use webhook secret here 
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
        };
        const onRamp=await db.onRampTransaction.findFirst({
            where:{
                token:paymentInformation.token
            }
        });
        if(onRamp?.status=="Success"){
            res.status(411).json({
                msg:"Payment is already completed"
            })
        }
        else {
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
            amount:balance?.amount+paymentInformation.amount
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
        await db.onRampTransaction.update({
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
}
  })
  
app.listen(3003);
