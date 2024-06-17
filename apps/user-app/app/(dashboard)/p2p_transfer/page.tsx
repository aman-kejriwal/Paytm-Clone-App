"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import createP2Ptransaction from "../../lib/actions/createP2Ptransaction";

export default function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError]=useState("");
    return <div className="h-[90vh] w-full">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <div>
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                        }} />
                     {/* <div className="text-red-600">{error}</div> */}
                    </div>
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const res=await createP2Ptransaction(number,Number(amount));
                            // if(!res){
                               setError("This is your number");
                            // }else{
                             window.location.href='/transfer'
                            // }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}