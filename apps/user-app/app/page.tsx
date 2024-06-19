import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";
import prisma from "@repo/db/client";
import { signOut } from "next-auth/react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user=await prisma.user.findFirst({
    where:{
      number:session.user.email
    }
  })
  if(!user){
    console.log(user+" "+"Aman");
    redirect('/api/auth/signin')
  }
  else {
    if (session?.user) {
      redirect('/dashboard')
    } else {
      redirect('/api/auth/signin')
    }
}
}