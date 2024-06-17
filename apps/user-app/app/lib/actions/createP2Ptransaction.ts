"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function(number:string,amount:number){
    const session=await getServerSession(authOptions);
    const username=session.user.name;
    const token=Math.random().toString();
    const user=await prisma.user.findFirst({
        where:{
            number
        }
    });
    // if(session.user.id==user?.id){
    //     return null;
    // }
    // else{
      await prisma.onRampTransaction.create({
        data:{
            amount:Number(amount)*100,
            status:"Success",    
            token,
            provider:username,
            userId:Number(user?.id),
            startTime:new Date()
        }
       })
       return {
        msg:"Your Money has been transferd"
       }
// }
}