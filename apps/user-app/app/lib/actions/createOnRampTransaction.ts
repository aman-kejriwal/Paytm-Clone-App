"use server"
import  client from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function createOnRampTransaction(amount :string, provider :string){
   const session =await getServerSession(authOptions);
   const userId = session.user.id;
   const token=Math.random().toString();
   //  token should idealy come from the bank
   //  axios.get("http://api.hdfcbank.com/getToken);
    if(!userId){
        return {
            msg:"You are not Loggde In"
        }
    }
   await client.onRampTransaction.create({
    data:{
        amount:Number(amount)*100,
        status:"Processing",    
        token,
        provider,
        userId:Number(userId),
        startTime:new Date()
    }
   })

   return {
    msg:"On Ramp Transaction has been Added"
   }
}