"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { resolve } from "path";
import { setTimeout } from "timers/promises";

export default async function(number:string,amount:number){
    const session=await getServerSession(authOptions);
    const senderID =session.user.id;
    const senderName=session.user.name||session.user.email;
    const token=Math.random().toString();
    const user=await prisma.user.findFirst({
        where:{
            number
        }
    });
    const receiverId=user?.id;
        //phone number not found in db
        if(!user){ 
            return "errorPhone";
        }
        //when you enter your number
        if(session.user.id==user?.id){
            return "errorYourNum";
        }
        const receiverBalance=await prisma.balance.findFirst({
            where:{
                userId:Number(receiverId)
            }
        })
        const senderBalance=await prisma.balance.findFirst({
            where:{
                userId:Number(senderID)
            }
        })
        if((senderBalance?.amount||Number.MAX_VALUE)<amount*100){
            return "errorInsuffiFund";
        }
        //function for either all happen or nothing will happen among all inside.
        await prisma.$transaction(async (client)=>{ 
            // LOCKING the Transaction so that other transaction won't enter while first in execution.
            await client.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(senderID)} FOR UPDATE`;
            await client.onRampTransaction.create({
                data:{
                    amount:Number(amount)*100,
                    status:"Success",    
                    token,
                    provider:senderName,
                    userId:Number(receiverId),
                    startTime:new Date()
                }
            })
            const recTotalBal=(receiverBalance?.amount||0)+amount*100
            await client.balance.update({
                where:{
                    userId:Number(receiverId)
                },
                data:{
                    amount:recTotalBal
                }
            })
            await client.balance.update({
                where:{
                    userId:Number(senderID)
                },
                data:{
                    amount:(senderBalance?.amount||0)-amount*100
                }
            })
        });
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
       return {
        msg:"Your Money has been transferd"
       }
// }
}