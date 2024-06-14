import { NextResponse } from "next/server"
import client from "@repo/db/client";
export const GET = async () => {
    const res=await client.user.create({
        data: {
            email: "Aman@gmail.com",
            name: "adsads",
            number:"jahdhfjhdfj",
            password:"ajdhfjhdf"
        }
    })
    console.log(res);
    return NextResponse.json({
        message: "hi there"
    })
}